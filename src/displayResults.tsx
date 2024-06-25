import { BarChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import timeSave from "./assets/time.png"
import accuracyTarget from "./assets/darts.png"
import savingsImg from "./assets/savings.png"
import SavingsDialog from './savingsDialog';
import { useState } from 'react';
import inputTypes from './types/inputTypes';
import resultTypes from './types/resultTypes';

function DisplayResults(props: {resultData: resultTypes, inputData: inputTypes}) {
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
                <p className='text-xs text-center font-light'>out of {props.inputData.aliquots} aliquots, based on target accuracy</p>
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
                    <div className='flex justify-center'>
                      <div className='text-center font-semibold'>
                          Competitors
                      </div>  
                      <button className='my-auto rounded-full w-4 h-4 border-2 border-neutral-900 ml-1 hover:bg-neutral-600' onClick={() => {setSavingsOpen(true)}}>
                        <div className='m-auto text-center text-xs -translate-y-0.5 text-neutral-600 hover:text-neutral-300'>
                          ?
                        </div>
                      </button>
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
          {/*
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
              */}
          <SavingsDialog savingsOpen={savingsOpen} setSavingsOpen={setSavingsOpen}/>
          <div className='w-[400px] -translate-x-3 h-9 my-2 bg-celltreat'>
            <h2 className='text-center w-full text-xl text-white font-bold my-auto pt-1'>
              What does it mean for your experiment?
            </h2>
          </div>
          <p className='text-sm'>
            {props.resultData.cost == 368 ? "During a typical week-long cell culture analysis with a 24-well cell culture plate, you may spend 7 hours seeding, treating, collecting, and analyzing cells. The time and cost spent can easily add up..." : "For your custom experiment..."}
          </p>
          {props.resultData.cost == 368 ? (
          <div className='grid grid-cols-[2.5rem_auto_auto] grid-rows-3 gap-y-1 gap-x-2 mt-1'>
            <div className='w-10'>
              <img src={timeSave} className='object-contain'/>
            </div>
            <div className='text-lg justify-self-start text-left my-auto'>
              Labor
            </div>
            <div className='text-lg justify-self-end my-auto'>
              $210
            </div>
            <div className='w-10'>
              <img src={timeSave}/>
            </div>
            <div className='text-lg justify-self-start text-left my-auto'>
              Supplies
            </div>
            <div className='text-lg justify-self-end my-auto'>
              $33
            </div>
            <div className='w-10'>
              <img src={timeSave}/>
            </div>
            <div className='text-lg justify-self-start text-left my-auto'>
              Analysis
            </div>
            <div className='text-lg justify-self-end my-auto'>
              $125
            </div>
          </div>
        )
          : <></>}
          <div className='col-span-3 h-0.5 bg-black rounded-full my-2'/>
          <div className='flex flex-row justify-end gap-3'>
            <div className='text-xl font-bold text-left mt-auto text-primary-dark'>
              Total Cost
            </div>
            <div className='font-bold my-auto text-3xl text-primary-bright'>
              ${props.resultData.cost}
            </div>
          </div>
          <div className='flex flex-row gap-3 mt-3'>
            <div className='font-bold my-auto text-4xl text-primary-bright'>
              {props.resultData.chanceOfFail.toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}
            </div>
            <div className='text-sm text-left text-primary-dark'>
              chance of making at least one mistake using a competitor product
            </div>
          </div>
          <div className='w-[400px] -translate-x-3 h-max my-2 bg-primary-bright'>
            <div className='text-lg font-bold text-center my-1 text-white'>
              Don't let one mistake cost you! Use <>ali-Q 2</>
            </div>
          </div>
        </div>
    ); 
}

export default DisplayResults;