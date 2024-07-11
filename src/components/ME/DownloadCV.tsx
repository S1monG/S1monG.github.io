import DownloadIcon from '@mui/icons-material/Download';
import { Tooltip, IconButton } from '@mui/material';
import { FC, ReactElement } from 'react';

const handleDownload = (): void => {
    const link = document.createElement('a')
    link.href = '/cv.pdf'
    link.download = 'SimonGustafssonCV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const DownloadCV: FC = (): ReactElement => {
  return (
    <Tooltip title="Download">
      <IconButton onClick={handleDownload}>
        <DownloadIcon/>
      </IconButton>
    </Tooltip>
  );
}

export default DownloadCV