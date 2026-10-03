import type { ProjectVideo } from "@/content/projects/types";

export function DemoVideo({ video }: Readonly<{ video: ProjectVideo }>) {
  if (video.state === "unavailable") {
    return (
      <p className="video-unavailable">
        Video not published. Request a technical walkthrough.
      </p>
    );
  }

  return (
    <figure className="published-video-link">
      <a href={video.url} target="_blank" rel="noopener noreferrer">
        {video.caption} <span aria-hidden="true">↗</span>
      </a>
      {video.transcript && <figcaption>{video.transcript}</figcaption>}
    </figure>
  );
}
