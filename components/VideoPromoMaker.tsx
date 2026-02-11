
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import {
  Play,
  Sparkles,
  Film,
  Loader2,
  Download,
  AlertCircle,
  CheckCircle2,
  Video,
  Clapperboard,
  RefreshCw,
  ExternalLink,
  Timer
} from 'lucide-react';

const PROMO_TEMPLATES = [
  {
    id: 'registration',
    name: 'Startup Launch',
    category: 'Business Registration',
    prompt: 'A sleek, modern cinematic advertisement for a startup launching in India. High-quality 3D graphics of corporate buildings, documents flying into a digital folder, and a final shot of a successful entrepreneur smiling at a desk with a "Majestic Group" logo on a laptop screen. Lighting is professional and warm.',
  },
  {
    id: 'tax',
    name: 'Tax Compliance',
    category: 'Tax & Accounting',
    prompt: 'A dynamic video ad showing a busy professional looking stressed with papers, then transitioning to a calm office with a digital tax dashboard. A neon "Tax Simplified" sign glows. Cinematic close-ups of golden coins stacking up and a "Majestic Group" gold seal appearing at the end.',
  },
  {
    id: 'ip',
    name: 'IP Protection',
    category: 'Intellectual Property',
    prompt: 'Abstract cinematic representation of an idea. A glowing lightbulb protected by an unbreakable crystalline shield. The camera pans around the shield. "Majestic Group" text appears in elegant silver letters. Futuristic and high-tech aesthetics.',
  }
];

const LOADING_STEPS = [
  "Securing the cinematic lens...",
  "Scripting your business story...",
  "Rendering 3D corporate environments...",
  "Applying professional color grading...",
  "Polishing the final frames...",
  "Final export in high definition..."
];

const VideoPromoMaker: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(PROMO_TEMPLATES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isGenerating) {
      interval = window.setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    setError(null);
    setVideoUrl(null);

    // 1. Check for API Key
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
      // Assume successful selection based on instructions
    }

    setIsGenerating(true);
    setLoadingStep(0);

    try {
      // Create a new GoogleGenAI instance right before making an API call to ensure it uses the latest key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: selectedTemplate.prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // 2. Poll for results
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        try {
          operation = await ai.operations.getVideosOperation({ operation: operation });
        } catch (pollError: any) {
          if (pollError.message?.includes("Requested entity was not found")) {
            throw new Error("API Key configuration error. Please select a valid paid project key.");
          }
          throw pollError;
        }
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        // The response.body contains the MP4 bytes. You must append an API key when fetching from the download link.
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      } else {
        throw new Error("Video generation completed but no URL was returned.");
      }
    } catch (err: any) {
      console.error("Video Generation Error:", err);
      if (err.message?.includes("API Key") || err.message?.includes("Requested entity was not found")) {
        setError("To generate videos, you must select a paid Google Cloud Project API key.");
      } else {
        setError("Something went wrong during generation. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenKeySelector = async () => {
    await (window as any).aistudio.openSelectKey();
  };

  return (
    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-3xl border border-white/5">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side: Controls */}
          <div className="lg:w-2/5 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-500/30">
                <Sparkles className="w-4 h-4" />
                Next-Gen AI Video Lab
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Create Your Promo in 60 Seconds</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Generate cinematic, high-definition promotional videos for your business using the latest Veo 3.1 AI technology.
              </p>
            </div>

            <div className="space-y-6">
              <label className="text-sm font-black text-slate-300 uppercase tracking-widest">Select Ad Theme</label>
              <div className="grid grid-cols-1 gap-4">
                {PROMO_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl)}
                    className={`p-5 rounded-2xl border transition-all text-left flex items-center justify-between group ${selectedTemplate.id === tpl.id
                        ? 'bg-indigo-600 border-indigo-400 shadow-xl shadow-indigo-600/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                  >
                    <div>
                      <div className={`font-black mb-1 ${selectedTemplate.id === tpl.id ? 'text-white' : 'text-slate-200'}`}>
                        {tpl.name}
                      </div>
                      <div className={`text-xs ${selectedTemplate.id === tpl.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {tpl.category}
                      </div>
                    </div>
                    <div className={`p-2 rounded-lg ${selectedTemplate.id === tpl.id ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                      <Clapperboard className={`w-5 h-5 ${selectedTemplate.id === tpl.id ? 'text-white' : 'text-slate-400'}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-white text-slate-900 py-6 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                    Director Processing...
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                    Generate Promo Video
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest px-2">
                <span className="flex items-center gap-1.5"><Video className="w-3 h-3" /> 720p Cinematic</span>
                <span className="flex items-center gap-1.5"><Timer className="w-3 h-3" /> ~2 min wait</span>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3 items-start animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-3">
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                  <button
                    onClick={handleOpenKeySelector}
                    className="text-white bg-red-500 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-red-600 transition-colors"
                  >
                    Select Paid API Key <ExternalLink className="w-3 h-3" />
                  </button>
                  <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-red-400/70 text-[10px] underline block">Learn about billing requirements</a>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Display */}
          <div className="lg:w-3/5">
            <div className="aspect-video bg-black/40 rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-inner flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center space-y-8 p-12">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    <Film className="w-10 h-10 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <div className="space-y-3 animate-pulse">
                    <h3 className="text-white text-2xl font-black">AI Director at Work</h3>
                    <p className="text-indigo-400 font-bold tracking-widest text-xs uppercase">{LOADING_STEPS[loadingStep]}</p>
                  </div>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                    High-quality video generation takes time. Grab a coffee while we render your masterpiece.
                  </p>
                </div>
              ) : videoUrl ? (
                <div className="w-full h-full group/player relative">
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover rounded-[2.5rem]"
                  />
                  <div className="absolute top-6 right-6 opacity-0 group-hover/player:opacity-100 transition-opacity">
                    <a
                      href={videoUrl}
                      download="majestic-promo.mp4"
                      className="bg-white/10 backdrop-blur-md text-white p-4 rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 font-bold"
                    >
                      <Download className="w-6 h-6" />
                      <span className="pr-2">Download</span>
                    </a>
                  </div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full font-black text-xs flex items-center gap-2 shadow-2xl">
                    <CheckCircle2 className="w-4 h-4" /> AD READY FOR USE
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10">
                    <Film className="w-10 h-10 text-slate-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-slate-400 font-black text-xl">Preview Studio</h3>
                    <p className="text-slate-600 text-sm">Your generated promotional video will appear here.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center space-y-2">
                <div className="text-indigo-400 font-black text-lg">1080p</div>
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Resolution</div>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center space-y-2">
                <div className="text-indigo-400 font-black text-lg">16:9</div>
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Aspect Ratio</div>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center space-y-2">
                <div className="text-indigo-400 font-black text-lg">MP4</div>
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Format</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPromoMaker;
