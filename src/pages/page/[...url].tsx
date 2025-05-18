import { GetServerSideProps } from "next";
import Error from "next/error";
import { getPageByUrl } from "@/services/pagesServices";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";

enum tone {
    DRAMATIC = 'Dramatic',
    IRONIC = 'Ironic',
    FUNNY = 'Funny',
    SERIOUS = 'Serious',
    SAD = 'Sad',
    HAPPY = 'Happy',
    NEUTRAL = 'Neutral'
};
interface IPageData {
  id?: number | string;
  userId?: number | string;
  title: string;
  url?: string;
  message: string;
  content?: string;
  tags: tone;
  theme: string;
  status: 'draft' | 'published' | 'archived';
  confidentiality?: 'public' | 'private';
  media: {
    image: string | null;
    video: string | null;
    audio: string | null;
  };
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface PageProps {
  isValidFormat: boolean;
  userId?: string;
  slug?: string;
  page?: IPageData;
}

const Page: React.FC<PageProps> = ({ isValidFormat, userId, slug, page }) => {
  // If URL format is invalid or page not found, show 404 error
  if (!isValidFormat || !page) {
    return <Error statusCode={404} />;
  }

  const [show, setShow] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Animate content in after a short delay
    const timer = setTimeout(() => {
      setShow(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handle video loading events
  const handleVideoLoadStart = () => {
    setIsVideoLoading(true);
  };

  const handleVideoCanPlay = () => {
    setIsVideoLoading(false);
  };

  // Design configurations based on tone
  const designConfig = {
    [tone.DRAMATIC]: {
      bgColor: "bg-gradient-to-br from-red-900 to-black",
      textColor: "text-white",
      headingColor: "text-red-400",
      borderColor: "border-red-700",
      animation: "animate-pulse",
      icon: "fa-theater-masks",
      buttonClass: "bg-red-700 hover:bg-red-800",
    },
    [tone.IRONIC]: {
      bgColor: "bg-gradient-to-r from-purple-900 to-indigo-900",
      textColor: "text-gray-200",
      headingColor: "text-purple-300",
      borderColor: "border-purple-600",
      animation: "animate-none",
      icon: "fa-meh-rolling-eyes",
      buttonClass: "bg-purple-700 hover:bg-purple-800",
    },
    [tone.FUNNY]: {
      bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
      textColor: "text-gray-900",
      headingColor: "text-yellow-900",
      borderColor: "border-yellow-500",
      animation: "animate-bounce",
      icon: "fa-laugh-squint",
      buttonClass: "bg-yellow-600 hover:bg-yellow-700",
    },
    [tone.SERIOUS]: {
      bgColor: "bg-gradient-to-r from-gray-800 to-gray-900",
      textColor: "text-gray-100",
      headingColor: "text-blue-300",
      borderColor: "border-blue-700",
      animation: "animate-none",
      icon: "fa-user-tie",
      buttonClass: "bg-blue-800 hover:bg-blue-900",
    },
    [tone.SAD]: {
      bgColor: "bg-gradient-to-b from-blue-900 to-blue-950",
      textColor: "text-blue-100",
      headingColor: "text-blue-300",
      borderColor: "border-blue-500",
      animation: "animate-none",
      icon: "fa-sad-tear",
      buttonClass: "bg-blue-700 hover:bg-blue-800",
    },
    [tone.HAPPY]: {
      bgColor: "bg-gradient-to-r from-green-400 to-teal-500",
      textColor: "text-white",
      headingColor: "text-green-100",
      borderColor: "border-green-300",
      animation: "animate-none",
      icon: "fa-smile-beam",
      buttonClass: "bg-green-600 hover:bg-green-700",
    },
    [tone.NEUTRAL]: {
      bgColor: "bg-gradient-to-r from-gray-200 to-gray-300",
      textColor: "text-gray-800",
      headingColor: "text-gray-700",
      borderColor: "border-gray-400",
      animation: "animate-none",
      icon: "fa-meh",
      buttonClass: "bg-gray-600 hover:bg-gray-700 text-white",
    }
  };

  console.log("Page data:", page);
  // Get the design config based on page tone, fallback to NEUTRAL if tone is invalid
  const design = designConfig[page.tags] || designConfig[tone.NEUTRAL];

  return (
    <>
      <Head>
        <title>{page.title} | TheEnd.page</title>
        <meta name="description" content={page.content || page.message} />
      </Head>

      <div className={`min-h-screen ${design.bgColor} ${design.textColor} flex flex-col items-center justify-center p-4`}>
        {/* Content Container */}
        <div 
          className={`max-w-2xl w-full bg-opacity-20 bg-black backdrop-blur-md p-8 rounded-lg border ${design.borderColor} shadow-2xl transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Icon and Title */}
          <div className="flex items-center mb-6">
            <div className={`mr-3 text-4xl ${design.headingColor}`}>
              <i className={`fas ${design.icon}`}></i>
            </div>
            <h1 className={`text-3xl md:text-4xl font-bold ${design.headingColor}`}>
              {page.title}
            </h1>
          </div>

          {/* Main Content */}
          <div className={`prose max-w-none ${design.textColor} mb-8 text-lg leading-relaxed whitespace-pre-wrap`}>
            {page.content || page.message}
          </div>

          {/* Media Display */}
          <div className="my-8">
            {/* Image */}
            {page.media?.image && Array.isArray(page.media.image) && page.media.image.length > 0 && (
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-4">
                <img 
                  src={page.media.image[0]} 
                  alt={page.title}
                  className="absolute w-full h-full object-cover"
                />
              </div>
            )}

            {/* Video with Loading State */}
            {page.media?.video && Array.isArray(page.media.video) && page.media.video.length > 0 && (
              <div className="my-4 relative">
                {isVideoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg z-10">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-2"></div>
                      <p className="text-white text-sm">Loading video...</p>
                    </div>
                  </div>
                )}
                <video 
                  ref={videoRef}
                  src={page.media.video[0]} 
                  controls
                  className="w-full rounded-lg"
                  onLoadStart={handleVideoLoadStart}
                  onCanPlay={handleVideoCanPlay}
                  onWaiting={() => setIsVideoLoading(true)}
                  onPlaying={() => setIsVideoLoading(false)}
                  poster="/images/video-placeholder.jpg"
                ></video>
              </div>
            )}

            {/* Audio */}
            {page.media?.audio && Array.isArray(page.media.audio) && page.media.audio.length > 0 && (
              <div className={`p-4 rounded-lg ${design.borderColor} border bg-black bg-opacity-30 my-4`}>
                <audio 
                  src={page.media.audio[0]} 
                  controls
                  className="w-full"
                ></audio>
              </div>
            )}
          </div>

          {/* View count */}
          <div className="flex items-center justify-between mt-6 text-sm opacity-70">
            <div>
              <i className="fas fa-eye mr-2"></i> 
              {page.views || 0} views
            </div>
          </div>

          {/* Share Button */}
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: page.title,
                    text: page.message,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className={`${design.buttonClass} text-white px-6 py-3 rounded-full flex items-center justify-center transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50`}
            >
              <i className="fas fa-share-alt mr-2"></i> Share This Exit
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-sm opacity-60">
          <p>Created on TheEnd.page</p>
        </footer>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get URL segments from the context
  const { url } = context.params || {};
  
  // Check if url is an array and has exactly 2 segments
  if (!Array.isArray(url) || url.length !== 2) {
    return {
      props: {
        isValidFormat: false,
      },
    };
  }

  // The url will be in the format [userId, slug]
  const [userId, slug] = url;

  // Additional validation: Check if userId is numeric
  if (!/^\d+$/.test(userId)) {
    return {
      props: {
        isValidFormat: false,
      },
    };
  }
  const fullSlug = `/${userId}/${slug}`;

  const page = await getPageByUrl(fullSlug);
  
  // If page not found, return invalid format
  if (!page) {
    return {
      props: {
        isValidFormat: false,
      },
    };
  }
  
  return {
    props: {
      isValidFormat: true,
      userId,
      slug: fullSlug,
      page,
    },
  };
};

export default Page;