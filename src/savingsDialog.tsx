import { Dialog, DialogContent, DialogTitle } from "@mui/material";

function SavingsDialog(props : {savingsOpen : boolean, setSavingsOpen : (state: boolean) => void}) {
    function closeDialog() {
        props.setSavingsOpen(false);
    }

    return (
        <Dialog open={props.savingsOpen} onClose={closeDialog} fullScreen={false}
        sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "400px",  // Set your width here
              },
            },
          }}
        >
            <DialogTitle>
                How did we calculate this?

            </DialogTitle>
            <DialogContent>
                Here is how!
            </DialogContent>
        </Dialog>
    );
}

export default SavingsDialog;