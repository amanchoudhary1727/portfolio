const SpotifyEmbed = () => {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 fade-in-up">
          <span className="text-xs font-light tracking-widest uppercase text-muted-foreground mono">
            05 — Listening
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight">
            What I'm playing
          </h2>
          <p className="mt-4 text-muted-foreground font-light max-w-xl">
            A curated playlist reflecting my current mood and creative process.
          </p>
        </div>
        
        {/* Spotify Embed */}
        <div className="fade-in-up delay-1 border border-border/50 rounded-lg overflow-hidden bg-card/30">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/playlist/1xV5EjxRMejCtRQuzU6Ls2?utm_source=generator"
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default SpotifyEmbed;
