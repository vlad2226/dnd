import { FileType, useStore } from '../store/useStore.ts';
import { Film, ImageIcon, Play } from 'lucide-react'

const cssProperties = 'w-12 h-12 text-gray-400';

const MediaCard = ({ id, name, type, url }: { id: string; name: string; type: FileType; url: string }) => {
    const { selectedFiles, toggleFileSelection } = useStore();
    const isSelected = selectedFiles.includes(id);

    const toggleFileSelectionId = () => {
        toggleFileSelection(id)
    }

    const renderMediaContent = () => {
        switch (type) {
            case 'image':
                return <img src={url} alt={name} className="w-full h-48 object-cover" />;
            case 'video':
                return (
                    <>
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                            <Film className={cssProperties} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Play className="w-12 h-12 text-white" />
                        </div>
                    </>
                );
            default:
                return (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                        <ImageIcon className={cssProperties} />
                    </div>
                );
        }
    };

    return (
        <div
            onClick={toggleFileSelectionId}
            className={`relative group cursor-pointer rounded-lg overflow-hidden ${
                isSelected ? 'ring-2 ring-blue-500' : ''
            }`}
        >
            {renderMediaContent()}

            {/*<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />*/}

            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm truncate">{name}</p>
            </div>
        </div>
    );
}

export default MediaCard;