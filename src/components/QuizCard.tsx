import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import '../styles/QuizCard.css';

interface QuizCardProps {
   title: string;
   titleSlang: string;
   groupTitleSlang: string;
   questionNumber: number;
}

export default function QuizCard(props: QuizCardProps) {

   function redirectToQuizPage() {

      window.location.assign(`./quiz/${props.groupTitleSlang}/${props.titleSlang}`);

   }

   const bestSuccessRate = Number(
      localStorage.getItem(`bestSuccessRate.${props.titleSlang}`)
   );

   return (
      <Container fluid className="quiz-button py-2 px-3 rounded d-flex justify-content-between align-items-center" style={{ height: '55px' }}>
         <div className="left d-flex flex-column">
            <h5 className="title mb-0">{props.title}</h5>
            <small className="text-secondary">{props.questionNumber} questions</small>
         </div>
         <div className="right d-flex align-items-center gap-2">
            <Button className={`rate-btn ${bestSuccessRate >= 80 ? 'bg-success' : bestSuccessRate >= 50 ? 'bg-warning' : 'bg-danger'} d-flex align-items-center justify-content-around gap-2 border-0`} style={{ height: '100%' }}>
               Taux de réussite: {bestSuccessRate}%
            </Button>
            <Button onClick={redirectToQuizPage} className="play-btn d-flex align-items-center justify-content-around border-0" style={{ width: '100px', height: '100%' }}>
               <i className="fa-solid fa-play"></i>
               Jouer
            </Button>
         </div>
      </Container>
   )
   
}