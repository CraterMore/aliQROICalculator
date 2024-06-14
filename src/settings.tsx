import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import centrifuge from "./assets/centrifuge.png";
import petriDish from "./assets/petri-dish.png";

type inputTypes = {
    container: string;
    aliquots: number;
    accuracy: string;
    cost: number;
}

function AdvSettings(props : {settingsOpen : boolean, setSettingsOpen : (state : boolean) => void, inputData : inputTypes, setInputData : (value: inputTypes) => void}) {
    function formReset() : inputTypes {
        return {
            container: props.inputData.container,
            aliquots: calculateValue(props.inputData.aliquots),
            accuracy: props.inputData.accuracy,
            cost: props.inputData.cost
        }
    }
    
    const [formData, setFormData] = useState(
        formReset()
    )

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if (newValue !== formData.aliquots) {
            setFormData({...formData, "aliquots" : newValue as number});
        }
      };

      function calculateLabel(value : number) {
        switch (value) {
          case 1:
            return 24;
          case 2:
            return 50;
          case 3:
            return 100;
          case 4:
            return 200;
          case 5:
            return 750;
          case 6:
            return 1000;
          case 7:
            return 5000;
          default:
            return 24;
        }
      }

      function calculateValue(value: number) {
        switch (value) {
            case 24:
                return 1;
            case 50:
                return 2;
            case 100:
                return 3;
            case 200:
                return 4;
            case 750:
                return 5;
            case 1000:
                return 6;
            case 5000:
                return 7;
            default:
                return 1;
        }
      }
      
      const marks = [1, 2, 3, 4, 5, 6, 7].map((value) => ({
        value,
        label: calculateLabel(value)
      }));

    function submitChanges() {
        props.setInputData(
            {
                container: formData.container,
                aliquots: calculateLabel(formData.aliquots),
                accuracy: formData.accuracy,
                cost: formData.cost
            }
        );
        props.setSettingsOpen(false);
    }

    function closeSettings() {
        props.setSettingsOpen(false);
        setFormData(formReset());
    }
    
    return(
        <Dialog open={props.settingsOpen} onClose={closeSettings}>
            <DialogTitle>
                Edit calculator variables
            </DialogTitle>
            <DialogContent>
                {/* Container Selection */}
                <div className='mb-2 font-bold'>
                    Select the primary container
                </div>
                <div className='w-full max-h-1/5 flex gap-6 px-3 items-start'>
                    <button className='w-full' name='15mL Centrifuge' onClick={(_event: React.MouseEvent<HTMLButtonElement>) => {
                        setFormData({...formData, "container" : "15mL Centrifuge"})
                    }}>
                        <div className='bg-primary-dark w-full aspect-square rounded-2xl aria-selected:bg-primary-bright hover:bg-primary' aria-selected={
                        formData.container == "15mL Centrifuge" ? true : false
                        }>
                        <img src={centrifuge} className="object-contain w-full h-auto p-2"/>
                        </div>
                        <h3 className='text-center w-full text-sm py-1'>
                        15mL Centrifuge Tubes
                        </h3>
                    </button>

                    <button className='w-full' name='100mm Petri Dish' onClick={(_event: React.MouseEvent<HTMLButtonElement>) => {
                        setFormData({...formData, "container" : "100mm Petri Dish"})
                    }}>
                        <div className='bg-primary-dark w-full aspect-square rounded-2xl aria-selected:bg-primary-bright hover:bg-primary' aria-selected={
                        formData.container == "100mm Petri Dish" ? true : false
                        }>
                        <img src={petriDish} className="object-contain w-full h-auto p-3"/>
                        </div>
                        <h3 className='text-center w-full text-sm py-1'>
                        100mm Petri Dish
                        </h3>
                    </button>

                    <button className='w-full' name='50mL Centrifuge' onClick={(_event: React.MouseEvent<HTMLButtonElement>) => {
                        setFormData({...formData, "container" : "50mL Centrifuge"})
                    }}>
                        <div className='bg-primary-dark w-full aspect-square rounded-2xl aria-selected:bg-primary-bright hover:bg-primary' aria-selected={
                        formData.container == "50mL Centrifuge" ? true : false
                        }>
                        <img src={centrifuge} className="object-contain w-full h-auto p-2"/>
                        </div>
                        <h3 className='text-center w-full text-sm py-1'>
                        50mL Centrifuge Tubes
                        </h3>
                    </button>
                </div>
                <div className='w-full flex flex-col gap-2 px-3 mb-3'>
                        <h2 className='font-bold'>How many aliquots?</h2>
                        <Slider 
                            value={formData.aliquots}
                            valueLabelDisplay="auto"
                            onChange={handleSliderChange}
                            marks={marks}
                            step={null}
                            min={1}
                            max={7}
                            scale={calculateLabel}
                            color='secondary'
                        />  
                        <h2 className='font-bold'>Total Cost of Experiment</h2>
                        <TextField 
                            value={formData.cost}
                            onChange={(event) => setFormData({...formData, "cost" : parseFloat(event.target.value)})}
                            type='number'
                            color='secondary'
                        />
                        
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeSettings} color='secondary'>
                        Cancel
                </Button>
                <Button color='secondary' variant='contained' onClick={submitChanges}>
                        Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AdvSettings;