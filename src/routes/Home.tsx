import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import QuizCard from '../components/QuizCard';
import '../styles/Home.css';
import quizGroups from '../data/quiz_groups.json';

export default function Home() {

   return (
      <Container className="main-container rounded py-3 shadow">
         <Container className="header d-flex flex-column align-items-center mb-4">
            <h2 className="d-flex align-items-center gap-2">
               <i className="fa-solid fa-car-burst"></i>
               Code de la route belge
            </h2>
            <span className="text-secondary">Testez vos compétences sur de nombreux sujets du code de la route belge.</span>
         </Container>
         <Accordion>
            {
               quizGroups.map((quizGroup, index) =>
                  <Accordion.Item eventKey={index.toString()}>
                     <Accordion.Header>
                        <h4 className="mb-0">{quizGroup.title}</h4>
                     </Accordion.Header>
                     <Accordion.Body className="d-flex flex-column gap-2">
                        {
                           quizGroup.quizzes.map((quiz) => 
                              <QuizCard title={quiz.title} groupTitleSlang={quizGroup.titleSlang} titleSlang={quiz.titleSlang} questionNumber={quiz.questions.length} />
                           )
                        }
                     </Accordion.Body>
                  </Accordion.Item>
               )
            }
         </Accordion>
         <Container className="footer mt-4 d-flex flex-column align-items-center">
            <h2 className="d-flex align-items-center gap-2">
               <i className="fa-solid fa-graduation-cap"></i>
               Examen
            </h2>
            <span className="text-secondary">Assurez-vous de vos compétences en simulant un examen de 50 questions au hasard.</span>
            <Button className="mt-4 d-flex align-items-center gap-2" style={{ width: 'fit-content' }} href="/examen">
               <i className="fa-solid fa-play"></i>
               Passer l'examen
            </Button>
         </Container>
      </Container>
   )

}