import { Box } from "@mui/material";
import {Modal} from "@mui/material";
import { ModalClose, Sheet } from '@mui/joy';

export default function BasicModal({
    children,
    show,
    unShow,
    width,
    height,
    title,
}){

  return (
    <div>
        <Modal open ={show}  
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display: 'flex', justifyContent:'center', alignItems:'center',border:'0', mx:'5px'}}
        >

      <Sheet
        variant="outlined"
        sx={{
        width:(width)? width: 450,
        height:(height)? height: 400, 
        borderRadius: 'md',
        p: 1,
        border:'0',
        boxShadow: 'lg',
        overflow: 'auto'}}
        >
        <div className="flex">
         <span className="pl-2 font-bold text-xl">{title}</span>
        <ModalClose onClick={()=> unShow()}/>
        </div>

        
       <div className="mt-5 p-2">{children}</div>
      </Sheet>
      </Modal>
    </div>
  )


}