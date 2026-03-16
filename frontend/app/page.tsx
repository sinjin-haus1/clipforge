'use client';

import { useState } from 'react';
import { 
  Box, Typography, Card, CardContent, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Paper, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Stack
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

interface Clip {
  id: string;
  title: string;
  status: string;
  duration: number;
  platform: string;
  createdAt: string;
}

export default function Dashboard() {
  const [clips] = useState<Clip[]>([
    { id: '1', title: 'Epic FF7 Rebirth Clutch', status: 'completed', duration: 45, platform: 'TikTok', createdAt: '2026-03-16' },
    { id: '2', title: 'Boxing Highlight Reel', status: 'processing', duration: 120, platform: 'YouTube Shorts', createdAt: '2026-03-16' },
    { id: '3', title: 'Street Fighter Combo', status: 'pending', duration: 30, platform: 'Reels', createdAt: '2026-03-15' },
  ]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const stats = [
    { label: 'Total Clips', value: 156, color: '#7c3aed' },
    { label: 'Processing', value: 12, color: '#f59e0b' },
    { label: 'Completed', value: 144, color: '#10b981' },
    { label: 'This Month', value: 23, color: '#06b6d4' },
  ];

  const getStatusColor = (status: string): 'success' | 'warning' | 'default' => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Dashboard</Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! You have 12 clips being processed.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={() => setUploadDialogOpen(true)}>
          Upload Video
        </Button>
      </Box>

      {/* Stats */}
      <Stack direction="row" spacing={3} mb={4} flexWrap="wrap" useFlexGap>
        {stats.map((stat, index) => (
          <Card key={index} sx={{ flex: '1 1 200px' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              <Typography variant="h4" fontWeight={700} sx={{ color: stat.color }}>{stat.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Clips Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>Recent Clips</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Platform</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clips.map((clip) => (
                  <TableRow key={clip.id}>
                    <TableCell>{clip.title}</TableCell>
                    <TableCell>
                      <Chip label={clip.status} size="small" color={getStatusColor(clip.status)} />
                    </TableCell>
                    <TableCell>{clip.duration}s</TableCell>
                    <TableCell>{clip.platform}</TableCell>
                    <TableCell>{clip.createdAt}</TableCell>
                    <TableCell align="right">
                      {clip.status === 'completed' && (
                        <>
                          <Button size="small" startIcon={<PlayArrowIcon />}>View</Button>
                          <Button size="small" startIcon={<DownloadIcon />}>Export</Button>
                        </>
                      )}
                      <Button size="small" color="error" startIcon={<DeleteIcon />}>Del</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Video</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Supported formats: MP4, MOV, WebM (max 2GB)
            </Typography>
            <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', cursor: 'pointer', borderStyle: 'dashed' }}>
              <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
              <Typography>Drag &amp; drop or click to browse</Typography>
            </Paper>
            <TextField fullWidth label="Title" />
            <TextField fullWidth select label="Aspect Ratio" defaultValue="9:16">
              <MenuItem value="9:16">9:16 (TikTok, Reels, Shorts)</MenuItem>
              <MenuItem value="1:1">1:1 (Square)</MenuItem>
              <MenuItem value="16:9">16:9 (Landscape)</MenuItem>
            </TextField>
            <TextField fullWidth select label="Platform" defaultValue="tiktok">
              <MenuItem value="tiktok">TikTok</MenuItem>
              <MenuItem value="shorts">YouTube Shorts</MenuItem>
              <MenuItem value="reels">Instagram Reels</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setUploadDialogOpen(false)}>Upload &amp; Process</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
