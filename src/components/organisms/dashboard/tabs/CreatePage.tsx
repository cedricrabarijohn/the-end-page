export interface CreatePageProps { };

const CreatePage: React.FC<CreatePageProps> = () => {
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Create a New Exit Page</h2>

            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="My Dramatic Exit"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Tone
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {['Dramatic', 'Ironic', 'Cringe', 'Classy'].map((tone) => (
                            <div key={tone} className="flex items-center">
                                <input id={`tone-${tone}`} type="radio" name="tone" className="hidden peer" />
                                <label
                                    htmlFor={`tone-${tone}`}
                                    className="w-full p-3 text-center border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-500 peer-checked:text-red-500 hover:bg-gray-50"
                                >
                                    {tone}
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
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Theme
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className={`h-16 rounded-lg bg-${['red', 'blue', 'purple', 'green', 'orange', 'gray'][i]}-100 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-${['red', 'blue', 'purple', 'green', 'orange', 'gray'][i]}-500`}></div>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Add Media
                    </label>
                    <div className="flex space-x-4">
                        <button className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400">
                            <div className="text-center">
                                <i className="fas fa-image text-gray-400 text-2xl mb-2"></i>
                                <p className="text-sm text-gray-500">Add Image</p>
                            </div>
                        </button>
                        <button className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400">
                            <div className="text-center">
                                <i className="fas fa-film text-gray-400 text-2xl mb-2"></i>
                                <p className="text-sm text-gray-500">Add Video</p>
                            </div>
                        </button>
                        <button className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400">
                            <div className="text-center">
                                <i className="fas fa-music text-gray-400 text-2xl mb-2"></i>
                                <p className="text-sm text-gray-500">Add Audio</p>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full"
                    >
                        Save as Draft
                    </button>
                    <button
                        className="cta-gradient text-black font-bold py-2 px-6 rounded-full transition transform hover:scale-105"
                    >
                        Publish <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePage;