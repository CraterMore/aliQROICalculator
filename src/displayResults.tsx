import { BarChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import timeSave from "./assets/time.png"
import accuracyTarget from "./assets/darts.png"
import savingsImg from "./assets/savings.png"
import SavingsDialog from './savingsDialog';
import { useState } from 'react';

type resultTypes = {
    percentFaster : string;
    aliQTime: number;
    competitorTime: number;
    aliQMistakes: number;
    competitorMistakes: number;
    accuracyDifference: string;
    savings: number;
  }

function DisplayResults(props: {resultData: resultTypes}) {
    const [savingsOpen, setSavingsOpen] = useState<boolean>(false);

    return (
        <div className='bg-green-100 h-full w-full flex flex-col px-3'>
          <h1 className='text-center w-full text-2xl font-bold py-2'>
            Results
          </h1>
          
          {/* Time Savings */}
          <div className='w-full flex h-fit'>
            <div className='w-1/5 h-auto my-auto'>
              <img className="object-contain" src={timeSave}></img>
            </div>
            <div className='w-1/4 h-full flex flex-col px-2 justify-center'>
              <div>ali-Q 2 is</div>
              <div className='text-primary-bright text-2xl font-extrabold text-justify'>{props.resultData.percentFaster}</div>
              <div className='text-primary-bright text-2xl font-semibold text-justify'>faster</div>
            </div>
            <div className='w-1/2 h-full ml-auto'>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['ali-Q 2', 'Competitors'] , label: "Product"}]}
                series={[{ data: [props.resultData.aliQTime/60, props.resultData.competitorTime/60] , color: "#762cd1"}]}
                yAxis={[{label: "Minutes"}]}
                sx={{
                  [`.${axisClasses.left} .${axisClasses.label}`]: {
                    // Move the y-axis label with CSS
                    transform: 'translateX(-0px)',
                  },
                }}
                title='Time'
                width={175}
                height={125}
                margin={{
                  top: 10,
                  bottom: 20,
                  left: 40,
                  right: 1,
                }}
                borderRadius={6}
              />
            </div>
          </div>

          {/* Mistakes */}
          <div>
            <div className='flex'>
              {/*Columns*/}
              <div className='w-2/3 flex flex-col'>
                <h2 className='text-center text-2xl font-bold'>
                  Number of Mistakes
                </h2>
                <p className='text-xs text-center font-light'>based on acceptable accuracy</p>
                <div className='flex justify-between mt-2 gap-4'>
                  <div className='h-24 w-1/3 bg-primary-light border-4 border-primary-bright rounded-lg flex flex-col'>
                    <div className='text-center font-semibold'>
                      ali-Q 2
                    </div>  
                    <div className='text-center font-bold text-4xl my-auto'>
                      {props.resultData.aliQMistakes}
                    </div>
                  </div>

                  <div className='h-24 w-2/3 bg-slate-200 border-4 border-slate-500 rounded-lg flex flex-col'>
                    <div className='text-center font-semibold'>
                      Competitors
                    </div>  
                    <div className='text-center font-bold text-4xl my-auto'>
                      {props.resultData.competitorMistakes}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-1/3 p-4'>
                <div className='w-full h-auto my-auto p-1'>
                  <img className="object-contain" src={accuracyTarget}></img>
                </div>
              </div>
            </div>
          </div>

          {/* Savings */}
          <div>
            <div className='flex'>
            <div className='w-1/3 p-4'>
                <div className='w-full h-auto my-auto p-1'>
                  <img className="object-contain" src={savingsImg}></img>
                </div>
              </div>
              <div className='w-2/3 flex flex-col py-4'>
                <h2 className='text-right text-3xl font-bold text-primary-bright'>
                  {props.resultData.savings.toLocaleString('en-US', {style: 'currency', currency: 'USD'})} saved
                </h2>
                <p className='text-right w-2/3 ml-auto leading-tight'>
                  with the improved accuracy of ali-Q 2
                  <button className='rounded-full w-4 h-4 border-2 border-neutral-900 ml-1 hover:bg-neutral-600' onClick={() => {setSavingsOpen(true)}}>
                    <div className='m-auto text-center text-xs -translate-y-0.5 text-neutral-600 hover:text-neutral-300'>
                      ?
                    </div>
                  </button>
                </p>
              </div>
            </div>
          </div>
          <SavingsDialog savingsOpen={savingsOpen} setSavingsOpen={setSavingsOpen}/>
        </div>
    ); 
}

export default DisplayResults;