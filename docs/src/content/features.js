import * as React from 'react';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import GppGoodIcon from '@mui/icons-material/GppGood';
import FastForwardIcon from '@mui/icons-material/FastForward';
import EditIcon from '@mui/icons-material/Edit';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Typography from '@mui/material/Typography';
import GradientText from 'docs/src/components/typography/GradientText';

const features = {
  overline: 'Features',
  Headline: (
    <Typography variant="h2" maxWidth={500} marginBottom={3}>
      <GradientText>Production-ready</GradientText>
      <br />
      in minutes
    </Typography>
  ),
  cards: [
    {
      icon: <BuildOutlinedIcon fontSize="small" color="primary" />,
      title: 'Build visually',
      wip: false,
      description:
        'Use the drag & drop canvas to build applications fast. Create a beautiful, functional user interface without writing a single line of CSS.',
    },
    {
      icon: <CodeIcon fontSize="small" color="primary" />,
      title: 'Extensible with code',
      wip: false,
      description:
        'Build low-code with pro-code extensibility. You can write JavaScript anywhere in Toolpad as soon as you feel limited by the built-in features.',
    },
    {
      icon: <LinkIcon fontSize="small" color="primary" />,
      title: 'Connect any data source',
      wip: true,
      description:
        'Find all the integrations that you need. So far, it supports REST, Google sheets, PostgreSQL. We are working on adding MySQL, GraphQL, and a plugin system to add new ones.',
    },
    {
      icon: <ViewModuleIcon fontSize="small" color="primary" />,
      title: 'MUI component library',
      wip: true,
      description:
        'Access the full suite of pre-built MUI components, including both MUI Core and MUI X—or bring your own custom components to your Toolpad app.',
    },
    {
      icon: <GppGoodIcon fontSize="small" color="primary" />,
      title: 'Self-host for security',
      wip: false,
      description:
        'Host Toolpad on your own infrastructure to keep full control over where your data goes. In the future, we will provide airgapping guarantees.',
    },
    {
      icon: <ThumbUpOutlinedIcon fontSize="small" color="primary" />,
      title: 'Collaboration',
      wip: true,
      description:
        'Toolpad enables your team to communicate and collaborate in one seamless building experience—no more shuffling between platforms.',
    },
    {
      icon: <FastForwardIcon fontSize="small" color="primary" />,
      title: 'Instant deployment ',
      wip: false,
      description:
        '1-click preview and instant deployment lets you ship your apps to end users in a snap',
    },
    {
      icon: <EditIcon fontSize="small" color="primary" />,
      title: 'Git sync',
      wip: true,
      description:
        'Git allows you to push, pull and manage your code. Sync your Toolpad app to work on multiple branches and submit PRs. Toolpad will support GitHub and other providers.',
    },
    {
      icon: <AutoAwesomeIcon fontSize="small" color="primary" />,
      title: 'Custom theming',
      wip: true,
      description:
        "Write CSS in Toolpad to manage the finer details. Import styles or define them locally to take full control of your app's theme.",
    },
  ],
};

export default features;
