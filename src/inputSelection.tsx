import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import centrifuge from "./assets/centrifuge.png"
import petriDish from "./assets/petri-dish.png"


type inputTypes = {
    container: string;
    aliquots: number;
    accuracy: string;
  }

function InputSelection(props : {inputData : inputTypes, setInputData : (value: inputTypes) => void}) {

    // function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    //     if (e.target.name != "aliquots") {
    //       props.setInputData({...props.inputData, [e.target.name] : e.target.value})
    //     } else {
    //       props.setInputData({...props.inputData, [e.target.name] : parseInt(e.target.value)})
    //     }
    //   }

  function handleSelect(event: SelectChangeEvent): void {
    props.setInputData({...props.inputData, "accuracy" : event.target.value})
  }

    return (
        <>
        <div className='w-full max-h-1/5 flex gap-6 px-3'>
          <button className='w-full' name='15mL Centrifuge' onClick={(_event: React.MouseEvent<HTMLButtonElement>) => {
            props.setInputData({...props.inputData, "container" : "15mL Centrifuge"})
          }}>
            <div className='bg-primary-dark w-full aspect-square rounded-2xl aria-selected:bg-primary-bright hover:bg-primary' aria-selected={
              props.inputData.container == "15mL Centrifuge" ? true : false
            }>
              <img src={centrifuge} className="object-contain w-full h-auto p-2"/>
            </div>
            <h3 className='text-center w-full text-sm py-1'>
              15mL Centrifuge Tubes
            </h3>
          </button>

          <button className='w-full' name='100mm Petri Dish' onClick={(_event: React.MouseEvent<HTMLButtonElement>) => {
            props.setInputData({...props.inputData, "container" : "100mm Petri Dish"})
          }}>
            <div className='bg-primary-dark w-full aspect-square rounded-2xl aria-selected:bg-primary-bright hover:bg-primary' aria-selected={
              props.inputData.container == "100mm Petri Dish" ? true : false
            }>
              <img src={petriDish} className="object-contain w-full h-auto p-3"/>
            </div>
            <h3 className='text-center w-full text-sm py-1'>
              100mm Petri Dish
            </h3>
          </button>

          <button className='w-full' name='50mL Centrifuge' onClick={(_event: React.MouseEvent<HTMLButtonElement>) => {
            props.setInputData({...props.inputData, "container" : "50mL Centrifuge"})
          }}>
            <div className='bg-primary-dark w-full aspect-square rounded-2xl aria-selected:bg-primary-bright hover:bg-primary' aria-selected={
              props.inputData.container == "50mL Centrifuge" ? true : false
            }>
              <img src={centrifuge} className="object-contain w-full h-auto p-2"/>
            </div>
            <h3 className='text-center w-full text-sm py-1'>
              50mL Centrifuge Tubes
            </h3>
          </button>
        </div>

        {/* Text Inputs */}
        <div className='w-full flex flex-col gap-2 px-3 mb-3'>
          <div className='flex w-full justify-between'>
            <h2 className='font-bold text-lg'>How many aliquots?</h2>

            <NumberInput 
            className='border-2 rounded-md'
              placeholder="Type a number..."
              value={props.inputData.aliquots}
              onChange={(_event, val) => val ? props.setInputData({...props.inputData, "aliquots" : val}) : props.setInputData({...props.inputData, "aliquots" : 10})}
              min={10}
              max={10000}
            />
            {/* <TextField 
              size="small" 
              fullWidth={false} 
              value={props.inputData.aliquots} 
              onChange={handleInput} 
              type="number" 
              name="aliquots" 
              variant="standard" 
              error={false}

            /> */}
            {/* <input 
              name="aliquots"
              className='border-2 rounded-md h-8 w-1/3'
              value={props.inputData.aliquots}
              type="number"
              onChange={handleInput}
              min={10}
              max={10000}
            ></input> */}
          </div>
          <div className='flex w-full justify-between'>
            <h2 className='font-bold text-lg'>Acceptable Accuracy</h2>
            <Select
              name="accuracy"
              onChange={handleSelect}
              size="small"
              variant="standard"
              className="w-1/3"
              value={props.inputData.accuracy}
              color="secondary"
            >
              <MenuItem value="0.90" dense color="secondary">
              ±10%
              </MenuItem>
              <MenuItem value="0.95" dense color="secondary">
              ±5%
              </MenuItem>
              <MenuItem value="0.97" dense color="secondary">
              ±3%
              </MenuItem>
              <MenuItem value="0.98" dense color="secondary">
              ±2%
              </MenuItem>
            </Select>
            {/* <input 
              name="accuracy"
              className='border-2 rounded-md h-8 w-1/3'
              value={props.inputData.accuracy}
              type="text"
              onChange={handleInput}
            ></input> */}
          </div>


        </div>
        </>
    );
}

export default InputSelection;