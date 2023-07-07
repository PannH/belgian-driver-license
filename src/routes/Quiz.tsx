import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import quizGroups from '../data/quiz_groups.json';
import '../styles/Quiz.css';
import { shuffleArray, calculatePercentage } from '../functions';

export default function Quiz() {

   const { groupTitleSlang, titleSlang } = useParams();

   const quizGroup = quizGroups.find((quizGroup) => quizGroup.titleSlang === groupTitleSlang);
   const quiz = quizGroup?.quizzes.find((quiz) => quiz.titleSlang === titleSlang);
   const questions = shuffleArray(quiz!.questions);

   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [currentScore, setCurrentScore] = useState(0);
   const [textInputValue, setTextInputValue] = useState('');
   const [hasFoundAnswer, setHasFoundAnswer] = useState(false);
   const [showDetails, setShowDetails] = useState(false);
   const [playedQuestions, setPlayedQuestions] = useState<any[]>([]);
   
   function getQuestions() {

      return questions.filter((question) => !playedQuestions.includes(question));

   }

   const [currentQuestion, setCurrentQuestion] = useState(getQuestions()[0]);

   console.log(getQuestions());
   console.log(currentQuestion);

   async function onButtonClick(event: any) {

      event.preventDefault();

      const selectedValue = 
         currentQuestion?.type === 'free' ?
            textInputValue :
            event.target.value;

      if (selectedValue === currentQuestion?.solution) {
         
         setCurrentScore((currentScore) => currentScore + 1);
         setHasFoundAnswer(true);

      } else {

         setHasFoundAnswer(false);

      }

      setTextInputValue('');
      setShowDetails(true);

   }

   function onTextInputChange(event: any) {

      event.preventDefault();

      setTextInputValue(event.target.value);

   }

   function onDetailsFormSubmit(event: any) {

      event.preventDefault();

      if (currentQuestionIndex + 1 === questions.length) {

         const thisSuccessRate = calculatePercentage(currentScore, questions.length);
         const bestSuccessRate = Number(
            localStorage.getItem(`bestSuccessRate.${quiz?.titleSlang}`)
         );

         if (thisSuccessRate > bestSuccessRate) {

            localStorage.setItem(`bestSuccessRate.${quiz?.titleSlang}`, thisSuccessRate.toString());

            alert(`🎉 Fin du quiz, vous avez battu votre meilleur taux de réussite: ${bestSuccessRate}% → ${thisSuccessRate}% !`);

         } else {

            alert(`🎈 Fin du quiz, vous n'avez pas battu votre taux de réussite: ${thisSuccessRate}% (meilleur: ${bestSuccessRate}%).`);

         }

         window.location.assign('/');

      } else {

         setCurrentQuestionIndex((value) => value + 1);
         setPlayedQuestions((value) => [...value, currentQuestion]);
         setShowDetails(false);

      }

   }

   function splitStringLines(string: string): ReactElement[] {

      return string
         ?.split(/\n/g)
         ?.map((stringLine) => 
            <>
               {stringLine}
               <br />
            </>
         );

   }

   useEffect(() => {
      setCurrentQuestion(getQuestions()[0]);
   }, [currentQuestionIndex]);

   return (
      <Card className="quiz-card container position-absolute px-3 py-1 shadow" style={{maxWidth: '550px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
         <Card.Header className="mb-2 border-0 h5 bg-transparent">
            <Link to="/" className="gap-2 text-decoration-none text-dark">
               <i className="fa-solid fa-arrow-left" style={{ marginRight: '7.5px' }}></i>
               Retour
            </Link>
            <h2 className="text-center mt-2">{quizGroup?.title} - {quiz?.title}</h2>
            <h5 className="text-center">Question: {currentQuestionIndex + 1} / {questions.length} (score: {currentScore})</h5>
         </Card.Header>
         <Card.Img src={currentQuestion?.imageURL} />
         <Card.Body>
            {
               showDetails ?
                  <>
                     <Card.Text className={`h5 alert ${hasFoundAnswer ? 'alert-success' : 'alert-danger'}`}>
                        {splitStringLines(currentQuestion?.details)}
                     </Card.Text> 
                     <Form onSubmit={onDetailsFormSubmit}>
                        <Form.Control type="submit" className="btn" value="Prochaine question" />
                     </Form>
                  </> :
                  <>
                     <Card.Text className='h5'>
                        {splitStringLines(currentQuestion?.prompt)}
                        </Card.Text>
                     <Form className="quiz-form d-flex gap-2 mt-4" onSubmit={onButtonClick}>
                        {
                           currentQuestion?.type === 'multiple-choice' ?
                              <>
                                 <Form.Control onClick={onButtonClick} type="button" className="btn" value="A" />
                                 <Form.Control onClick={onButtonClick} type="button" className="btn" value="B" />
                                 <Form.Control onClick={onButtonClick} type="button" className="btn" value="C" />
                              </> :
                              currentQuestion?.type === 'binary' ?
                                 <>
                                    <Form.Control onClick={onButtonClick} type="button" className="btn" value="OUI" />
                                    <Form.Control onClick={onButtonClick} type="button" className="btn" value="NON" />
                                 </> :
                                 <>
                                    <Form.Control type="text" value={textInputValue} onChange={onTextInputChange} />
                                    <Form.Control type="submit" className="btn" value="Confirmer" />
                                 </>
                        }
                     </Form>
                  </>
            }
         </Card.Body>
      </Card>
   )

}