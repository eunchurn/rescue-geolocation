import type { Metadata } from "next";
import { RescueContainer } from "@/views/rescue";

export const metadata: Metadata = {
  title: "긴급구조 위치 공유",
  description: "구조대원에게 위치를 공유하세요.",
  metadataBase: new URL("https://rescue.clev.app"),
};

export const fetchCache = "force-no-store";
interface RescueProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Rescue({ params }: RescueProps) {
  const { id } = await params;
  return (
    <div className="w-full max-w-md mx-auto p-6 flex flex-col justify-center min-h-screen">
      {/* Location Pin Animation */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="location-pin"></div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-black/20 dark:bg-white/20 rounded-full blur-sm"></div>
        </div>
      </div>
      
      {/* Content */}
      <RescueContainer id={id} />
    </div>
  );
}
