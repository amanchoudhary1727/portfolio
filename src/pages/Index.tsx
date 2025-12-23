import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Interests from '@/components/Interests';
import Resume from '@/components/Resume';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import Footer from '@/components/Footer';

interface IndexProps {
  onOpenChat: () => void;
}

const Index: React.FC<IndexProps> = ({ onOpenChat }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        <Hero />
        <About onOpenChat={onOpenChat} />
        <Projects />
        <Interests />
        <Resume />
        <SpotifyEmbed />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
