
import GamePlayer from "@/components/GamePlayer";

export default async function PlayPage({ params }) {
  const { slug } = await params;

  return <GamePlayer slug={slug} />;
}
