
import {DataContext} from '../store/GlobalState'
import {deleteItem} from '../store/Actions'
import {useContext} from 'react'

const modal =() =>{
    const [state,dispatch] = useContext(DataContext)
    const {modal} =state

    const handleSubmit = ()=>{
        dispatch (deleteItem(modal.data,modal.id,'ADD_CART'))
        dispatch({type:'ADD_MODEL',payload: {} })
    }
    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{modal.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span> 
                        </button>
                    </div>
                    <div className="modal-body">
                        delete it
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleSubmit}>Yes</button>
                        <button type="button" className="btn btn-primary">Cancel</button>
                    </div>
                    </div>
        </div>
        </div>
    )
}
export default modal