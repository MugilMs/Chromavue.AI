
import { EnhanceParams } from "@/pages/Index";
import { Settings } from "lucide-react";

interface ParameterControlsProps {
  params: EnhanceParams;
  onParamsChange: (params: EnhanceParams) => void;
  onReset: () => void;
}

export const ParameterControls = ({ params, onParamsChange, onReset }: ParameterControlsProps) => {
  const updateParam = (key: keyof EnhanceParams, value: any) => {
    onParamsChange({ ...params, [key]: value });
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-800">Enhancement Settings</h2>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Scale Factor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scale Factor: {params.scale}x
          </label>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={params.scale}
            onChange={(e) => updateParam('scale', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1x</span>
            <span>2x</span>
            <span>3x</span>
            <span>4x</span>
          </div>
        </div>

        {/* Enhancement Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Enable Enhancement
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={params.enhance}
              onChange={(e) => updateParam('enhance', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        {/* Enhancement Creativity */}
        {params.enhance && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enhancement Creativity: {params.enhanceCreativity.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={params.enhanceCreativity}
              onChange={(e) => updateParam('enhanceCreativity', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Conservative</span>
              <span>Creative</span>
            </div>
          </div>
        )}

        {/* Enhancement Prompt */}
        {params.enhance && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enhancement Prompt
            </label>
            <input
              type="text"
              value={params.enhancePrompt}
              onChange={(e) => updateParam('enhancePrompt', e.target.value)}
              placeholder="e.g., gold, marble, vintage, cinematic"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional style guidance (e.g., materials, moods, artistic styles)
            </p>
          </div>
        )}

        {/* Replication */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Replication: {params.replication.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={params.replication}
            onChange={(e) => updateParam('replication', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Less Detail</span>
            <span>More Detail</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Controls preservation of original image details and noise
          </p>
        </div>
      </div>
    </div>
  );
};
