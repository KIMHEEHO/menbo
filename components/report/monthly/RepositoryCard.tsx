import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Star, Clock } from "lucide-react";
type RepositoryCardProps = {
  name: string;
  description: string | null;
  primaryLanguage: {
    name: string;
  } | null;
  url: string;
  stargazerCount: number;
  pushedAt: string;
};

export default function RepositoryCard(props: RepositoryCardProps) {
  return (
    <Card className="rounded-xl border shadow-sm px-5 py-4 w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold text-black">
            {props.name}
          </CardTitle>

          <a
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition hover:text-black"
          >
            <ExternalLink size={18} />
          </a>
        </div>

        {/* <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {props.description ?? "프로젝트 설명이 없습니다."}
        </p> */}
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3 text-sm">
          {/* Language */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Language</span>

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              {props.primaryLanguage?.name ?? "N/A"}
            </span>
          </div>

          {/* Star */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Stars</span>

            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={15} fill="currentColor" />
              <span className="font-semibold text-black">
                {props.stargazerCount}
              </span>
            </div>
          </div>

          {/* Last Push */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Last Push</span>

            <div className="flex items-center gap-1 text-gray-600">
              <Clock size={14} />
              {new Date(props.pushedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
