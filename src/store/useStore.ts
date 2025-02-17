import { create } from "zustand";
import { LucideIcon } from "lucide-react";
import {groupBy} from '../lib/utils.ts';

export type FileType = "image" | "video" | "gif";

export interface MediaFile {
  id: string;
  name: string;
  type: FileType;
  url: string;
  folderId: string;
  aspectRatio: number;
}

export interface Filter {
  name: string;
  type: FileType;
  icon: LucideIcon;
}

interface Folder {
  id: string;
  name: string;
}

interface Filters {
  image: boolean;
  video: boolean;
  gif: boolean;
}

interface MediaStore {
  accordionFilterOpen: boolean;
  files: MediaFile[];
  folders: Record<string, Folder>;
  selectedFilters: Filters;
  selectedFolder: string | null;
  groupedFiles: Record<string, MediaFile[]>;
  selectedFiles: string[];
  selectedFilesOrder: Record<string, number>;
  searchQuery: string;
  setAccordionFilterOpen: (isOpen: boolean) => void;
  setSelectedFolder: (id: string | null) => void;
  toggleFileSelection: (id: string) => void;
  setFilter: (filterType: FileType, value: boolean) => void;
  setSearchQuery: (query: string) => void;
  deleteFile: (id: string) => void;
  renameFile: (id: string, newName: string) => void;
  moveFiles: (fileIds: string[], targetFolderId: string) => void;
}

const initialFiles: MediaFile[] = [
  {
    id: "1",
    name: "Mountain Landscape",
    type: "image",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    folderId: "landscapes",
    aspectRatio: 16 / 9,
  },
  {
    id: "2",
    name: "City Sunset",
    type: "image",
    url: "https://images.unsplash.com/photo-1514565131-fce0801e5785",
    folderId: "landscapes",
    aspectRatio: 16 / 9,
  },
  {
    id: "3",
    name: "Nature Video",
    type: "video",
    url: "https://example.com/nature-video.mp4",
    folderId: "videos",
    aspectRatio: 16 / 9,
  },
  {
    id: "4",
    name: "Portrait Shot",
    type: "image",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    folderId: "portraits",
    aspectRatio: 3 / 4,
  },
  {
    id: "5",
    name: "Square Food Image",
    type: "image",
    url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
    folderId: "food",
    aspectRatio: 1,
  },
  {
    id: "6",
    name: "Panoramic Cityscape",
    type: "image",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    folderId: "landscapes",
    aspectRatio: 16 / 9,
  },
  {
    id: "7",
    name: "Funny Cat GIF",
    type: "gif",
    url: "https://example.com/funny-cat.gif",
    folderId: "misc",
    aspectRatio: 16 / 9,
  },
  {
    id: "8",
    name: "Product Video",
    type: "video",
    url: "https://example.com/product-video.mp4",
    folderId: "videos",
    aspectRatio: 16 / 9,
  },
  {
    id: "9",
    name: "Abstract Art",
    type: "image",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab",
    folderId: "misc",
    aspectRatio: 16 / 9,
  },
  {
    id: "10",
    name: "Tall Building",
    type: "image",
    url: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722",
    folderId: "landscapes",
    aspectRatio: 16 / 9,
  },
];

const initialFolders: Record<string, Folder> = {
  landscapes: {
    id: "landscapes",
    name: "Landscapes",
  },
  videos: {
    id: "videos",
    name: "Videos",
  },
  misc: {
    id: "misc",
    name: "Misc",
  },
};

const groupedFiles = groupBy(initialFiles, (file) => file.type)


export const useStore = create<MediaStore>((set) => ({
  accordionFilterOpen: true,
  files: initialFiles,
  groupedFiles: groupedFiles,
  folders: initialFolders,
  selectedFilters: {
    image: true,
    video: true,
    gif: true,
  },
  selectedFolder: null,
  selectedFiles: [],
  selectedFilesOrder: {},
  searchQuery: "",

  setSelectedFolder: (id) =>
    set((prevState) => ({
      selectedFolder: prevState.selectedFolder === id ? null : id,
    })),

  setAccordionFilterOpen: (isOpen: boolean) =>
    set({ accordionFilterOpen: isOpen }),

    toggleFileSelection: (id) =>
        set((state) => {
            const isSelected = state.selectedFiles.includes(id);
            const newSelectedFiles = isSelected
                ? state.selectedFiles.filter((fileId) => fileId !== id)
                : [...state.selectedFiles, id];

            const newSelectedFilesOrder = newSelectedFiles.reduce((acc, fileId, index) => {
                acc[fileId] = index + 1;
                return acc;
            }, {} as Record<string, number>);

            return {
                selectedFiles: newSelectedFiles,
                selectedFilesOrder: newSelectedFilesOrder,
            };
        }),

  setFilter: (filterType, value) =>
    set((state) => ({
      selectedFilters: {
        ...state.selectedFilters,
        [filterType]: value,
      },
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  deleteFile: (id) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
      selectedFiles: state.selectedFiles.filter((selectedFileId) => selectedFileId !== id),
    })),

  renameFile: (id, newName) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, name: newName } : file
      ),
    })),

  moveFiles: (fileIds: string[], targetFolderId: string) =>
    set((state) => {
      const updatedFiles = state.files.map((file) =>
        fileIds.includes(file.id) ? { ...file, folderId: targetFolderId } : file
      );
      return {
        files: updatedFiles,
      };
    }),
}));