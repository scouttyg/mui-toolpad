import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { NodeId } from '@mui/toolpad-core';
import * as appDom from '../../../appDom';
import { useDom, useDomApi } from '../../DomLoader';
import MapEntriesEditor from '../../../components/MapEntriesEditor';
import useBoolean from '../../../utils/useBoolean';

export interface UrlQueryEditorProps {
  pageNodeId: NodeId;
}

export default function UrlQueryEditor({ pageNodeId }: UrlQueryEditorProps) {
  const { dom, currentView } = useDom();
  const domApi = useDomApi();

  const page = appDom.getNode(dom, pageNodeId, 'page');

  const { value: isDialogOpen, setTrue: openDialog, setFalse: closeDialog } = useBoolean(false);

  const value = page.attributes.parameters?.value;
  const [input, setInput] = React.useState(value);
  React.useEffect(() => {
    if (isDialogOpen) {
      setInput(value);
    }
  }, [isDialogOpen, value]);

  const handleButtonClick = React.useCallback(() => {
    domApi.setView({
      kind: 'page',
      nodeId: pageNodeId,
      view: { kind: 'pageParameters' },
    });
  }, [domApi, pageNodeId]);

  const handleDialogClose = React.useCallback(() => {
    domApi.setView({ kind: 'page', nodeId: pageNodeId });
  }, [domApi, pageNodeId]);

  const handleSave = React.useCallback(() => {
    domApi.update((draft) =>
      appDom.setNodeNamespacedProp(
        draft,
        page,
        'attributes',
        'parameters',
        appDom.createConst(input || []),
      ),
    );
    handleDialogClose();
  }, [domApi, handleDialogClose, input, page]);

  React.useEffect(() => {
    if (currentView.kind === 'page' && currentView.view?.kind === 'pageParameters') {
      openDialog();
    } else {
      closeDialog();
    }
  }, [closeDialog, currentView, openDialog]);

  return (
    <React.Fragment>
      <Button color="inherit" startIcon={<AddIcon />} onClick={handleButtonClick}>
        Add page parameters
      </Button>
      <Dialog fullWidth open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit page parameters</DialogTitle>
        <DialogContent>
          <Typography>
            The parameters you define below will be made available in bindings under the{' '}
            <code>page.parameters</code> global variable. You can set these parameters in the url
            with query variables (<code>?param=value</code>).
          </Typography>
          <MapEntriesEditor
            sx={{ my: 3 }}
            fieldLabel="Parameter"
            valueLabel="Default value"
            value={input || []}
            onChange={setInput}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="text" onClick={handleDialogClose}>
            Close
          </Button>
          <Button disabled={value === input} onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
