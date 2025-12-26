import MovieInvitation from '@/components/MovieInvitation';

const Index = () => {
  return (
    <MovieInvitation
      guestName="Александр Петров"
      vipNumber="001"
      movieTitle="Тени прошлого"
      tagline="Некоторые секреты лучше оставить в темноте"
      date="15 января 2025"
      time="19:00"
      venue="Кинотеатр Премьер"
      posterUrl="https://cdn.poehali.dev/projects/5470209c-7cec-4199-aa23-b4ddcfef0eac/files/738f4e54-ba38-4731-a98d-dce8190b24f7.jpg"
    />
  );
};

export default Index;