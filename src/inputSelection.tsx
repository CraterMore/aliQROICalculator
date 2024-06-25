import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import AdvSettings from "./settings";
import inputTypes from "./types/inputTypes";

function InputSelection(props : {inputData : inputTypes, setInputData : (value: inputTypes) => void}) {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  function handleSelect(event: React.MouseEvent<HTMLElement>, value: string | null): void {
    props.setInputData({...props.inputData, "accuracy" : value ? value : "0.95"})
  }

  function openSettings() {
    setSettingsOpen(true);
  }

    return (
        <>
        {/* Text Inputs */}
        <div className='w-full flex flex-col gap-2 px-3 mb-3'>
          <div className='flex w-full justify-between'>
            <h2 className='font-bold text-lg my-auto'>Acceptable Accuracy</h2>
            <ToggleButtonGroup
              onChange={handleSelect}
              exclusive
              size="small"
              value={props.inputData.accuracy}
              color="secondary"
            >
              <ToggleButton value="0.90"  color="secondary">
              ±10%
              </ToggleButton>
              <ToggleButton value="0.95"  color="secondary">
              ±5%
              </ToggleButton>
              <ToggleButton value="0.97"  color="secondary">
              ±3%
              </ToggleButton>
              <ToggleButton value="0.98"  color="secondary">
              ±2%
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className='self-end'>
            <Button
              variant='outlined'
              color='secondary'
              onClick={openSettings}
              className='mx-auto'
              size="small"
            >
              Advanced Settings
            </Button>
          </div>
        </div>
        <AdvSettings settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} inputData={props.inputData} setInputData={props.setInputData}/>
        </>
    );
}

export default InputSelection;