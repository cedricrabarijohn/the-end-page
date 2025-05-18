import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_ROUTES, PAGES_ROUTES } from '@/globals';

export interface CreatePageProps { };

const CreatePage: React.FC<CreatePageProps> = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        tone: '',
        message: '',
        theme: '',
    });
    
    // Media uploads state
    const [mediaFiles, setMediaFiles] = useState({
        image: null as File | null,
        video: null as File | null,
        audio: null as File | null,
    });
    
    // Preview URLs for uploaded media
    const [mediaPreviews, setMediaPreviews] = useState({
        image: '',
        video: '',
        audio: '',
    });
    
    // Error states for file uploads
    const [uploadErrors, setUploadErrors] = useState({
        image: '',
        video: '',
        audio: ''
    });
    
    // Maximum file size in bytes (3MB)
    const MAX_FILE_SIZE = 3 * 1024 * 1024;
    
    // Refs for file inputs
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);
    
    // Handle text input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,    
            [id]: value
        }));
    };
    
    // Handle tone selection
    const handleToneChange = (tone: string) => {
        setFormData(prev => ({
            ...prev,
            tone
        }));
    };
    
    // Handle theme selection
    const handleThemeSelect = (theme: string) => {
        setFormData(prev => ({
            ...prev,
            theme
        }));
    };
    
    // Validate file size
    const isFileSizeValid = (file: File): boolean => {
        return file.size <= MAX_FILE_SIZE;
    };
    
    // Format bytes to human-readable size
    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' bytes';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
    };
    
    // Handle file uploads
    const handleFileUpload = (type: 'image' | 'video' | 'audio', e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        // Clear previous errors
        setUploadErrors(prev => ({
            ...prev,
            [type]: ''
        }));
        
        // Check file size
        if (!isFileSizeValid(file)) {
            setUploadErrors(prev => ({
                ...prev,
                [type]: `File size exceeds 3MB limit (${formatFileSize(file.size)})`
            }));
            
            // Reset the file input
            if (type === 'image' && imageInputRef.current) imageInputRef.current.value = '';
            if (type === 'video' && videoInputRef.current) videoInputRef.current.value = '';
            if (type === 'audio' && audioInputRef.current) audioInputRef.current.value = '';
            
            return;
        }
        
        // Update media files state
        setMediaFiles(prev => ({
            ...prev,
            [type]: file
        }));
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setMediaPreviews(prev => ({
            ...prev,
            [type]: previewUrl
        }));
    };
    
    // Trigger file input click
    const triggerFileUpload = (type: 'image' | 'video' | 'audio') => {
        if (type === 'image' && imageInputRef.current) {
            imageInputRef.current.click();
        } else if (type === 'video' && videoInputRef.current) {
            videoInputRef.current.click();
        } else if (type === 'audio' && audioInputRef.current) {
            audioInputRef.current.click();
        }
    };
    
    // Handle form submission
    const handleSubmit = async (isDraft: boolean = false) => {
        // Check if there are any upload errors
        if (Object.values(uploadErrors).some(error => error !== '')) {
            toast.error('Please fix file upload errors before submitting');
            return;
        }

        // Basic validation
        if (!formData.title) {
            toast.error('Please enter a title');
            return;
        }
        if (!formData.message) {
            toast.error('Please enter a message');
            return;
        }
        if (!formData.tone) {
            toast.error('Please select a tone');
            return;
        }

        try {
            setIsSubmitting(true);
            
            // Create form data object
            const newFormData = new FormData();
            
            // Add form fields
            newFormData.append('title', formData.title);
            newFormData.append('message', formData.message);
            newFormData.append('tone', formData.tone);
            newFormData.append('theme', formData.theme);
            newFormData.append('status', isDraft ? 'draft' : 'published');
            
            // Add media files if they exist
            if (mediaFiles.image) {
                newFormData.append('image', mediaFiles.image);
            }
            if (mediaFiles.video) {
                newFormData.append('video', mediaFiles.video);
            }
            if (mediaFiles.audio) {
                newFormData.append('audio', mediaFiles.audio);
            }
            
            // Send data to API - FIXED: Using correct axios config for FormData
            const response = await axios.post(API_ROUTES.USER.PAGES.CREATE, newFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data.success) {
                toast.success(`Page ${isDraft ? 'saved as draft' : 'published'} successfully!`);
                // Redirect to dashboard after successful creation
                window.location.href = PAGES_ROUTES.DASHBOARD.ROOT;
            } else {
                throw new Error(response.data.error || 'Error creating page');
            }
        } catch (error) {
            console.error('Error creating page:', error);
            toast.error('Failed to create page. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Create a New Exit Page</h2>

            <div className="bg-white shadow-md rounded-lg p-6">
                <form onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    handleSubmit(false);
                }}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="My Dramatic Exit"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tone
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {[
                                { value: 'Dramatic', icon: 'fa-theater-masks', color: 'red' },
                                { value: 'Ironic', icon: 'fa-meh-rolling-eyes', color: 'purple' },
                                { value: 'Funny', icon: 'fa-laugh', color: 'yellow' },
                                { value: 'Serious', icon: 'fa-user-tie', color: 'blue' },
                                { value: 'Sad', icon: 'fa-sad-tear', color: 'indigo' },
                                { value: 'Happy', icon: 'fa-smile-beam', color: 'green' },
                                { value: 'Neutral', icon: 'fa-meh', color: 'gray' }
                            ].map((tone) => (
                                <div key={tone.value} className="flex items-center">
                                    <input 
                                        id={`tone-${tone.value}`} 
                                        type="radio" 
                                        name="tone" 
                                        className="hidden peer" 
                                        checked={formData.tone === tone.value}
                                        onChange={() => handleToneChange(tone.value)}
                                    />
                                    <label
                                        htmlFor={`tone-${tone.value}`}
                                        className={`w-full p-3 text-center border-2 border-gray-200 rounded-lg cursor-pointer 
                                            transition-all duration-200 ease-in-out
                                            flex flex-col items-center justify-center gap-2
                                            hover:bg-gray-50 hover:border-${tone.color}-300
                                            peer-checked:border-${tone.color}-500 peer-checked:bg-${tone.color}-50
                                            peer-checked:text-${tone.color}-700 peer-checked:shadow-md`}
                                    >
                                        <i className={`fas ${tone.icon} text-xl ${formData.tone === tone.value ? `text-${tone.color}-500` : 'text-gray-400'}`}></i>
                                        <span>{tone.value}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Your Message
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="message"
                            placeholder="Share your dramatic exit message here..."
                            rows={5}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                            {['red', 'blue', 'purple', 'green', 'orange', 'gray'].map((color, i) => (
                                <div 
                                    key={i} 
                                    className={`h-16 rounded-lg bg-${color}-100 hover:ring-offset-2`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Add Media <span className="text-gray-500 font-normal">(Max 3MB per file)</span>
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {/* Hidden file inputs */}
                            <input 
                                type="file" 
                                ref={imageInputRef} 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => handleFileUpload('image', e)}
                            />
                            <input 
                                type="file" 
                                ref={videoInputRef} 
                                className="hidden" 
                                accept="video/*"
                                onChange={(e) => handleFileUpload('video', e)}
                            />
                            <input 
                                type="file" 
                                ref={audioInputRef} 
                                className="hidden" 
                                accept="audio/*"
                                onChange={(e) => handleFileUpload('audio', e)}
                            />
                            
                            {/* Image upload button/preview */}
                            <div className="w-32 h-32">
                                {mediaPreviews.image ? (
                                    <div className="relative w-full h-full group">
                                        <img 
                                            src={mediaPreviews.image} 
                                            alt="Uploaded image" 
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                            <button 
                                                type="button"
                                                className="text-white hover:text-red-500" 
                                                onClick={() => {
                                                    setMediaFiles(prev => ({ ...prev, image: null }));
                                                    setMediaPreviews(prev => ({ ...prev, image: '' }));
                                                    setUploadErrors(prev => ({ ...prev, image: '' }));
                                                    if (imageInputRef.current) {
                                                        imageInputRef.current.value = '';
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <button 
                                            type="button"
                                            className={`flex items-center justify-center w-full h-32 border-2 border-dashed ${uploadErrors.image ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg hover:border-gray-400`}
                                            onClick={() => triggerFileUpload('image')}
                                        >
                                            <div className="text-center">
                                                <i className={`fas fa-image text-${uploadErrors.image ? 'red' : 'gray'}-400 text-2xl mb-2`}></i>
                                                <p className={`text-sm text-${uploadErrors.image ? 'red' : 'gray'}-500`}>Add Image / Gif</p>
                                            </div>
                                        </button>
                                        {uploadErrors.image && (
                                            <p className="text-xs text-red-500 mt-1">{uploadErrors.image}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            {/* Video upload button/preview */}
                            <div className="w-32 h-32">
                                {mediaPreviews.video ? (
                                    <div className="relative w-full h-full group">
                                        <video 
                                            src={mediaPreviews.video} 
                                            className="w-full h-full object-cover rounded-lg" 
                                            controls
                                        ></video>
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                            <button 
                                                type="button"
                                                className="text-white hover:text-red-500" 
                                                onClick={() => {
                                                    setMediaFiles(prev => ({ ...prev, video: null }));
                                                    setMediaPreviews(prev => ({ ...prev, video: '' }));
                                                    setUploadErrors(prev => ({ ...prev, video: '' }));
                                                    if (videoInputRef.current) {
                                                        videoInputRef.current.value = '';
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <button 
                                            type="button"
                                            className={`flex items-center justify-center w-full h-32 border-2 border-dashed ${uploadErrors.video ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg hover:border-gray-400`}
                                            onClick={() => triggerFileUpload('video')}
                                        >
                                            <div className="text-center">
                                                <i className={`fas fa-film text-${uploadErrors.video ? 'red' : 'gray'}-400 text-2xl mb-2`}></i>
                                                <p className={`text-sm text-${uploadErrors.video ? 'red' : 'gray'}-500`}>Add Video</p>
                                            </div>
                                        </button>
                                        {uploadErrors.video && (
                                            <p className="text-xs text-red-500 mt-1">{uploadErrors.video}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            {/* Audio upload button/preview */}
                            <div className="w-32 h-32">
                                {mediaPreviews.audio ? (
                                    <div className="relative w-full h-full group flex items-center justify-center border-2 border-gray-300 rounded-lg bg-gray-50">
                                        <audio 
                                            src={mediaPreviews.audio} 
                                            controls
                                            className="w-full px-2"
                                        ></audio>
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                            <button 
                                                type="button"
                                                className="text-white hover:text-red-500" 
                                                onClick={() => {
                                                    setMediaFiles(prev => ({ ...prev, audio: null }));
                                                    setMediaPreviews(prev => ({ ...prev, audio: '' }));
                                                    setUploadErrors(prev => ({ ...prev, audio: '' }));
                                                    if (audioInputRef.current) {
                                                        audioInputRef.current.value = '';
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <button 
                                            type="button"
                                            className={`flex items-center justify-center w-full h-32 border-2 border-dashed ${uploadErrors.audio ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg hover:border-gray-400`}
                                            onClick={() => triggerFileUpload('audio')}
                                        >
                                            <div className="text-center">
                                                <i className={`fas fa-music text-${uploadErrors.audio ? 'red' : 'gray'}-400 text-2xl mb-2`}></i>
                                                <p className={`text-sm text-${uploadErrors.audio ? 'red' : 'gray'}-500`}>Add Audio</p>
                                            </div>
                                        </button>
                                        {uploadErrors.audio && (
                                            <p className="text-xs text-red-500 mt-1">{uploadErrors.audio}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full"
                            onClick={() => handleSubmit(true)}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save as Draft'}
                        </button>
                        <button
                            type="submit"
                            className="cta-gradient text-black font-bold py-2 px-6 rounded-full transition transform hover:scale-105"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Publishing...' : 'Publish'} {!isSubmitting && <i className="fas fa-arrow-right ml-2"></i>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePage;