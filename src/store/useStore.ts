import { create } from 'zustand';

export type FileType = 'image' | 'video' | 'gif';

export interface MediaFile {
  id: string;
  name: string;
  type: FileType;
  url: string;
  folderId: string;
}

export interface Filter {
  name: string;
  type: FileType;
  fileCount: number;
}

export interface Folder {
  id: string;
  name: string;
  fileCount: number;
}

interface MediaStore {
  folders: Folder[];
  files: MediaFile[];
  filters: Filter[];
  selectedFolder: string | null;
  selectedFiles: string[];
  filterType: FileType | null;
  searchQuery: string;
  setSelectedFolder: (id: string | null) => void;
  toggleFileSelection: (id: string) => void;
  setFilterType: (type: FileType | null) => void;
  setSearchQuery: (query: string) => void;
  deleteFiles: (ids: string[]) => void;
  renameFile: (id: string, newName: string) => void;
  moveFiles: (fileIds: string[], targetFolderId: string) => void;
}

const files: MediaFile[] = [
  {
    id: '1',
    name: 'Mountain Landscape',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    folderId: 'landscapes'
  },
  {
    id: '2',
    name: 'City Sunset',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785',
    folderId: 'landscapes'
  },
  {
    id: '3',
    name: 'Nature Video',
    type: 'video',
    url: 'https://example.com/video.mp4',
    folderId: 'videos'
  }
];

const folders: Folder[] = [
  { id: 'landscapes', name: 'Landscapes', fileCount: 2 },
  { id: 'videos', name: 'Videos', fileCount: 1 },
  { id: 'misc', name: 'Misc', fileCount: 0 }
];

const filters: Filter[] = [
  { name: 'Images', type: 'image', fileCount: 2},
  { name: 'Videos', type: 'video', fileCount: 1},
  { name: 'GIFs', type: 'gif', fileCount: 0}
]

export const useStore = create<MediaStore>((set) => ({
  folders,
  filters,
  files,
  selectedFolder: null,
  selectedFilter: [],
  selectedFiles: [],
  filterType: null,
  searchQuery: '',

  setSelectedFolder: (id) => set({ selectedFolder: id }),
  
  toggleFileSelection: (id) => set((state) => ({
    selectedFiles: state.selectedFiles.includes(id)
      ? state.selectedFiles.filter(fileId => fileId !== id)
      : [...state.selectedFiles, id]
  })),

  setFilterType: (type) => set({ filterType: type }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),

  deleteFiles: (ids) => set((state) => ({
    files: state.files.filter(file => !ids.includes(file.id)),
    selectedFiles: state.selectedFiles.filter(id => !ids.includes(id))
  })),

  renameFile: (id, newName) => set((state) => ({
    files: state.files.map(file =>
      file.id === id ? { ...file, name: newName } : file
    )
  })),

  moveFiles: (fileIds, targetFolderId) => set((state) => ({
    files: state.files.map(file =>
      fileIds.includes(file.id)
        ? { ...file, folderId: targetFolderId }
        : file
    )
  }))
}));