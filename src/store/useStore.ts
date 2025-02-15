import { create } from "zustand";
import { LucideIcon } from "lucide-react";

export type FileType = "image" | "video" | "gif";

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
  icon: LucideIcon;
  fileCount: number;
}

export interface Folder {
  id: string;
  name: string;
  fileCount: number;
}

interface SelectedFilters {
  [filterType: string]: boolean;
}

interface MediaStore {
  accordionFilterOpen: boolean;
  folders: Folder[];
  files: MediaFile[];
  selectedFolder: string | null;
  // selectedFilters: FileType[];
  selectedFiles: string[];
  // filterType: FileType | null;
  searchQuery: string;
  setAccordionFilterOpen: (isOpen: boolean) => void;
  setSelectedFolder: (id: string | null) => void;
  toggleFileSelection: (id: string) => void;
  setSelectedFilterType: (filter: SelectedFilters) => void;
  selectedFilterType: SelectedFilters;
  setSearchQuery: (query: string) => void;
  deleteFiles: (ids: string[]) => void;
  renameFile: (id: string, newName: string) => void;
  moveFiles: (fileIds: string[], targetFolderId: string) => void;
}

const files: MediaFile[] = [
  {
    id: "1",
    name: "Mountain Landscape",
    type: "image",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    folderId: "landscapes",
  },
  {
    id: "2",
    name: "City Sunset",
    type: "image",
    url: "https://images.unsplash.com/photo-1514565131-fce0801e5785",
    folderId: "landscapes",
  },
  {
    id: "3",
    name: "Nature Video",
    type: "video",
    url: "https://example.com/video.mp4",
    folderId: "videos",
  },
];

const folders: Folder[] = [
  { id: "landscapes", name: "Landscapes", fileCount: 2 },
  { id: "videos", name: "Videos", fileCount: 1 },
  { id: "misc", name: "Misc", fileCount: 0 },
];

export const useStore = create<MediaStore>((set) => ({
  accordionFilterOpen: true,
  folders,
  files,
  selectedFolder: null,
  selectedFiles: [],
  selectedFilterType: {
    image: true,
    video: true,
    gif: true,
  },
  searchQuery: "",

  setSelectedFolder: (id) =>
    set((prevState) => ({
      selectedFolder: prevState.selectedFolder === id ? null : id,
    })),

  setAccordionFilterOpen: (isOpen: boolean) =>
    set({ accordionFilterOpen: isOpen }),

  toggleFileSelection: (id) =>
    set((state) => ({
      selectedFiles: state.selectedFiles.includes(id)
        ? state.selectedFiles.filter((fileId) => fileId !== id)
        : [...state.selectedFiles, id],
    })),

  setSelectedFilterType: (type) =>
    set((prevState) => ({
      selectedFilterType: {
        ...prevState.selectedFilterType,
        ...type,
      },
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  deleteFiles: (ids) =>
    set((state) => ({
      files: state.files.filter((file) => !ids.includes(file.id)),
      selectedFiles: state.selectedFiles.filter((id) => !ids.includes(id)),
    })),

  renameFile: (id, newName) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, name: newName } : file,
      ),
    })),

  moveFiles: (fileIds: string[], targetFolderId: string) =>
    set((state) => {
      console.log({fileIds, targetFolderId})
      return ({
      files: state.files.map((file) =>
        fileIds.includes(file.id)
          ? { ...file, folderId: targetFolderId }
          : file,
      ),
    })}),
}));
