import { MenuItem, Menu, ListItemIcon, ListItemText, ButtonProps, MenuProps } from '@mui/material';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { NodeId } from '@mui/toolpad-core';
import * as appDom from '../../appDom';
import { useDom } from '../DomLoader';
import useLatest from '../../utils/useLatest';
import { ConfirmDialog } from '../../components/SystemDialogs';
import useMenu from '../../utils/useMenu';

export interface NodeMenuProps {
  nodeId: NodeId;
  renderButton: (params: { buttonProps: ButtonProps; menuProps: MenuProps }) => React.ReactNode;
  deleteLabelText?: string;
  duplicateLabelText?: string;
  onDeleteNode?: (nodeId: NodeId) => void;
  onDuplicateNode?: (nodeId: NodeId) => void;
}

export default function NodeMenu({
  nodeId,
  renderButton,
  deleteLabelText,
  duplicateLabelText,
  onDeleteNode,
  onDuplicateNode,
}: NodeMenuProps) {
  const { dom } = useDom();

  const { menuProps, buttonProps, onMenuClose } = useMenu();

  const [deletedNodeId, setDeletedNodeId] = React.useState<NodeId | null>(null);
  const handleDeleteNodeDialogOpen = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setDeletedNodeId(nodeId);
      onMenuClose(event);
    },
    [nodeId, onMenuClose],
  );
  const deletedNode = deletedNodeId && appDom.getMaybeNode(dom, deletedNodeId);
  const latestDeletedNode = useLatest(deletedNode);

  const handleDeleteNodeDialogClose = React.useCallback(
    (confirmed: boolean, event: React.MouseEvent) => {
      event.stopPropagation();

      setDeletedNodeId(null);
      if (confirmed && deletedNode) {
        onDeleteNode?.(deletedNodeId);
      }
    },
    [deletedNode, deletedNodeId, onDeleteNode],
  );

  const handleDuplicateClick = React.useCallback(
    (event: React.MouseEvent) => {
      onMenuClose(event);
      onDuplicateNode?.(nodeId);
    },
    [onDuplicateNode, nodeId, onMenuClose],
  );

  return (
    <React.Fragment>
      {renderButton({
        buttonProps,
        menuProps,
      })}
      <Menu
        {...menuProps}
        onClick={(event) => {
          event.stopPropagation();
          menuProps.onClick?.(event);
        }}
      >
        <MenuItem onClick={handleDuplicateClick}>
          <ListItemIcon>
            <ContentCopyIcon />
          </ListItemIcon>
          <ListItemText>{duplicateLabelText}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteNodeDialogOpen}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>{deleteLabelText}</ListItemText>
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={!!deletedNode}
        severity="error"
        onClose={handleDeleteNodeDialogClose}
        okButton="Delete"
      >
        Delete {latestDeletedNode?.type} &quot;{latestDeletedNode?.name}&quot;?
      </ConfirmDialog>
    </React.Fragment>
  );
}
