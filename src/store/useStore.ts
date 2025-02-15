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
}

interface GroupedFilesByType {
  [key: string]: {
    id: string;
    name: string;
    content: MediaFile[];
  };
}

interface SelectedFilters {
  [filterType: string]: boolean;
}

interface MediaStore {
  accordionFilterOpen: boolean;
  files: MediaFile[];
  selectedFolder: string | null;
  groupedFilesByType: GroupedFilesByType;
  filterCount: { image: number; video: number; gif: number };
  // selectedFilters: FileType[];
  selectedFiles: string[];
  selectedFilesOrder: { [key: string]: number };
  // filterType: FileType | null;
  searchQuery: string;
  setAccordionFilterOpen: (isOpen: boolean) => void;
  setSelectedFolder: (id: string | null) => void;
  toggleFileSelection: (id: string) => void;
  setSelectedFilterType: (filter: SelectedFilters) => void;
  selectedFilterType: SelectedFilters;
  setSearchQuery: (query: string) => void;
  deleteFile: (id: string) => void;
  renameFile: (id: string, newName: string) => void;
  moveFiles: (fileIds: string[], targetFolderId: string) => void;
}

// supposedly we'd have these in a real-world application, with data fetched from a database or API'
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

const groupedFilesByType: GroupedFilesByType = {
  landscapes: {
    id: "landscapes",
    name: "Landscapes",
    content: [...files.filter((file) => file.folderId === "landscapes")],
  },
  videos: {
    id: "videos",
    name: "Videos",
    content: [...files.filter((file) => file.folderId === "videos")],
  },
  misc: {
    id: "misc",
    name: "Misc",
    content: [...files.filter((file) => file.folderId === "misc")],
  },
};


const filterCount = files.reduce(
  (acc, file) => {
    switch (file.type) {
      case "video":
        acc.video += 1;
        break;
      case "image":
        acc.image += 1;
        break;
      case "gif":
        acc.gif += 1;
        break;
    }
    return acc;
  },
  {
    video: 0,
    image: 0,
    gif: 0,
  },
);

export const useStore = create<MediaStore>((set) => ({
  accordionFilterOpen: true,
  files,
  groupedFilesByType,
  selectedFolder: null,
  selectedFiles: [],
  selectedFilesOrder: {},
  selectedFilterType: {
    image: true,
    video: true,
    gif: true,
  },
  searchQuery: "",
  filterCount,

  setSelectedFolder: (id) =>
    set((prevState) => ({
      selectedFolder: prevState.selectedFolder === id ? null : id,
    })),

  setAccordionFilterOpen: (isOpen: boolean) =>
    set({ accordionFilterOpen: isOpen }),

  toggleFileSelection: (id) =>
    set((state) => {
      const isSelected = state.selectedFiles.includes(id);
      let newSelectedFiles: string[];
      let newSelectedFilesOrder: { [key: string]: number };

      if (isSelected) {
        newSelectedFiles = state.selectedFiles.filter((fileId) => fileId !== id);
        newSelectedFilesOrder = { ...state.selectedFilesOrder };
        delete newSelectedFilesOrder[id];
        // Reorder remaining files
        newSelectedFiles.forEach((fileId, index) => {
          newSelectedFilesOrder[fileId] = index + 1;
        });
      } else {
        newSelectedFiles = [...state.selectedFiles, id];
        newSelectedFilesOrder = {
          ...state.selectedFilesOrder,
          [id]: newSelectedFiles.length,
        };
      }

      return {
        selectedFiles: newSelectedFiles,
        selectedFilesOrder: newSelectedFilesOrder,
      };
    }),

  setSelectedFilterType: (type) =>
    set((prevState) => ({
      selectedFilterType: {
        ...prevState.selectedFilterType,
        ...type,
      },
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  deleteFile: (id) =>
    set((state) => ({
      files: state.files.filter((file) => !id.includes(file.id)),
      selectedFiles: state.selectedFiles.filter((selectedFilesId) => !id.includes(selectedFilesId)),
    })),

  renameFile: (id, newName) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, name: newName } : file,
      ),
    })),

  moveFiles: (fileIds: string[], targetFolderId: string) =>
    set((state) => {
      const updatedFiles = state.files.map((file) => {
        if (fileIds.includes(file.id)) {
          return { ...file, folderId: targetFolderId };
        }
        return file;
      });

      const updatedGroupedFilesByType = { ...state.groupedFilesByType };

      // Remove files from their original folders
      Object.keys(updatedGroupedFilesByType).forEach((folderId) => {
        updatedGroupedFilesByType[folderId].content = updatedGroupedFilesByType[folderId].content.filter(
          (file) => !fileIds.includes(file.id)
        );
      });

      // Add files to the target folder
      const movedFiles = updatedFiles.filter((file) => fileIds.includes(file.id));
      updatedGroupedFilesByType[targetFolderId].content.push(...movedFiles);

      return {
        files: updatedFiles,
        groupedFilesByType: updatedGroupedFilesByType,
      };
    }),
}));
