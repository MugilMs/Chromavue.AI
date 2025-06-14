
import { EnhanceParams } from "@/pages/Index";
import { Settings, Sliders, Sparkles, Wand2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600" />
          <h2 className="text-lg font-medium text-slate-900">Enhancement Settings</h2>
        </div>
      </div>

      <div className="space-y-6">
        {/* Scale Factor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-700">
              Scale Factor
            </Label>
            <span className="text-sm font-medium text-blue-600">{params.scale}x</span>
          </div>
          <div className="pt-1">
            <Slider
              defaultValue={[params.scale]}
              min={1}
              max={4}
              step={1}
              value={[params.scale]}
              onValueChange={(value) => updateParam('scale', value[0])}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>1x</span>
            <span>2x</span>
            <span>3x</span>
            <span>4x</span>
          </div>
        </div>

        {/* Enhancement Toggle */}
        <div className="flex flex-row items-center justify-between rounded-lg border border-slate-200 p-3 shadow-sm">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium text-slate-700">
              AI Enhancement
            </Label>
            <p className="text-xs text-slate-500">
              Apply AI-powered image enhancement
            </p>
          </div>
          <Switch
            checked={params.enhance}
            onCheckedChange={(checked) => updateParam('enhance', checked)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>

        {/* Enhancement Creativity */}
        {params.enhance && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Label className="text-sm font-medium text-slate-700">
                  Creativity
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Wand2 className="h-3.5 w-3.5 text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">Controls how creative the AI can be with enhancements</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium text-blue-600">{params.enhanceCreativity.toFixed(2)}</span>
            </div>
            <div className="pt-1">
              <Slider
                defaultValue={[params.enhanceCreativity]}
                min={0}
                max={1}
                step={0.01}
                value={[params.enhanceCreativity]}
                onValueChange={(value) => updateParam('enhanceCreativity', value[0])}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Conservative</span>
              <span>Creative</span>
            </div>
          </div>
        )}

        {/* Enhancement Prompt */}
        {params.enhance && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <Label className="text-sm font-medium text-slate-700">
                Style Prompt
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Sparkles className="h-3.5 w-3.5 text-slate-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Optional style guidance for the AI enhancement</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <Input
                value={params.enhancePrompt}
                onChange={(e) => updateParam('enhancePrompt', e.target.value)}
                placeholder="e.g., gold, marble, vintage, cinematic"
                className="w-full border-slate-200 focus-visible:ring-blue-500"
              />
            </div>
            <p className="text-xs text-slate-500">
              Describe materials, moods, or artistic styles
            </p>
          </div>
        )}

        {/* Replication */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Label className="text-sm font-medium text-slate-700">
                Detail Preservation
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Settings className="h-3.5 w-3.5 text-slate-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Controls how much of the original image details are preserved</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-sm font-medium text-blue-600">{params.replication.toFixed(2)}</span>
          </div>
          <div className="pt-1">
            <Slider
              defaultValue={[params.replication]}
              min={0}
              max={1}
              step={0.01}
              value={[params.replication]}
              onValueChange={(value) => updateParam('replication', value[0])}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Less Detail</span>
            <span>More Detail</span>
          </div>
        </div>
      </div>
    </div>
  );
};
