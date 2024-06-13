import { useEffect, useState } from 'react'
import InputSelection from './inputSelection';
import DisplayResults from './displayResults';
import pmf from '@stdlib/stats-base-dists-binomial-pmf';


type inputTypes = {
  container: string;
  aliquots: number;
  accuracy: string;
}

type resultTypes = {
  percentFaster : string;
  aliQTime: number;
  competitorTime: number;
  aliQMistakes: number;
  competitorMistakes: number;
  accuracyDifference: string;
  savings: number;
}

function App() {
  const [inputData, setInputData] = useState<inputTypes>({
    container: "15mL Centrifuge",
    aliquots: 100,
    accuracy: "0.95",
  });

  const [resultData, setResultData] = useState<resultTypes>({
    percentFaster: "",
    aliQTime: 0,
    competitorTime: 0,
    aliQMistakes: 0,
    competitorMistakes: 0,
    accuracyDifference: "",
    savings: 0,
  })

  function calculate() {
    // Calculate time savings
    const timePerTenAliQ: {[key: string]: number} = {
      "15mL Centrifuge": 44,
      "100mm Petri Dish": 45,
      "50mL Centrifuge": 70.5,
    }
    const timePerTenCompetitors: {[key: string]: number} = {
      "15mL Centrifuge": 51,
      "100mm Petri Dish": 50,
      "50mL Centrifuge": 78.83,
    }
    const aliQTime : number = timePerTenAliQ[inputData.container] * (inputData.aliquots / 10);
    const compTime : number = timePerTenCompetitors[inputData.container] * (inputData.aliquots / 10);
    //const difference = (aliQTime - compTime)/60;
    const percentFaster = Number(1- (aliQTime/compTime)).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}); 

    const mistakesPerHundredAliQ: {[key: string]: number} = {
      "0.90": 0,
      "0.95": 0,
      "0.97": 0,
      "0.98": 0,
    }

    const mistakesPerHundredCompetitors: {[key: string]: number} = {
      "0.90": 0,
      "0.95": 8,
      "0.97": 23,
      "0.98": 42.5
    }
    const aliQMistakes : number = Math.round(mistakesPerHundredAliQ[inputData.accuracy] * (inputData.aliquots / 100));
    const compMistakes : number = Math.round(mistakesPerHundredCompetitors[inputData.accuracy] * (inputData.aliquots / 100));

    const distErrors : number[] = [
      pmf(0.0, 24, parseFloat(inputData.accuracy) - (1 - (mistakesPerHundredCompetitors[inputData.accuracy]/100))),
      pmf(1.0, 24, parseFloat(inputData.accuracy) - (1 - (mistakesPerHundredCompetitors[inputData.accuracy]/100))),
      pmf(2.0, 24, parseFloat(inputData.accuracy) - (1 - (mistakesPerHundredCompetitors[inputData.accuracy]/100)))
    ];

    console.log(distErrors);

    const costOfExperimentFailure : number = Math.round(368 * (1 - distErrors[0]));
    const costOfFail : number = costOfExperimentFailure * (inputData.aliquots/24);

    
    setResultData({percentFaster: percentFaster, aliQTime: aliQTime, competitorTime: compTime, aliQMistakes: aliQMistakes, competitorMistakes: compMistakes, accuracyDifference: "", savings: costOfFail});
  }

  useEffect(() => {
    calculate();
  }, [inputData])


  return (
    <>
      <div className='w-full h-[800px] flex bg-slate-100 flex-grow flex-col'>
        <h1 className='self-center text-3xl font-bold my-3'>
          ali-Q 2 ROI Calculator
        </h1>

        {/* Container Selection */}
        <InputSelection inputData={inputData} setInputData={setInputData}/>

        <div className='w-full h-1 bg-celltreat'/>

        {/* Results */}
        <DisplayResults resultData={resultData}/>
        
      </div>
    </>
  )
}

export default App
