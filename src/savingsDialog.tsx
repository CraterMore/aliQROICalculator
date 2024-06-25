import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

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
                More about "Competitor" Products

            </DialogTitle>
            <DialogContent>
                Competitor data was gathered using the same methodology as ali-Q 2 data. Competitor products are non-aliquoting pipet controllers that require you to manually observe the graduations when dispensing.
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="secondary" variant="text">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default SavingsDialog;