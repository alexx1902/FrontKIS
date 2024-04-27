import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Specification extends Component {

    constructor(props){
        super(props);

        this.state={
            specifications:[],
            modalTitle:"",
            positionID:0,
            parentID:"",
            description:"",
            quantityPerParent:0,
            unitMeasurement:"",

            positionIDFilter:"",
            descriptionFilter:"",
            specificationsWithoutFilter:[]
        }
    }

    FilterFn(){
        var positionIDFilter=this.state.positionIDFilter;
        var descriptionFilter = this.state.descriptionFilter;

        var filteredData=this.state.specificationsWithoutFilter.filter(
            function(el){
                return el.positionID.toString().toLowerCase().includes(
                    positionIDFilter.toString().trim().toLowerCase()
                ) &&
                el.description.toString().toLowerCase().includes(
                    descriptionFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({specifications:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.specificationsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({specifications:sortedData});
    }

    changepositionIDFilter = (e)=>{
        this.setState({positionIDFilter: e.target.value}, () => this.FilterFn());
    }
    changedescriptionFilter = (e)=>{
        this.setState({descriptionFilter: e.target.value}, () => this.FilterFn());
    }
    changeparentID = (e)=>{
        this.setState({parentID: e.target.value});
    }
    changedescription = (e)=>{
        this.setState({description: e.target.value});
    }
    changequantityPerParent = (e)=>{
        this.setState({quantityPerParent: e.target.value});
    }
    changeunitMeasurement = (e)=>{
        this.setState({unitMeasurement: e.target.value});
    }

    refreshList(){
        fetch(variables.API_URL+'Specification')
        .then(response=>response.json())
        .then(data=>{
            this.setState({specifications:data,specificationsWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    addClick(){
        this.setState({
            modalTitle:"Add Specification",
            positionID:0,
            description:"",
            parentID:"",
            quantityPerParent:0,
            unitMeasurement:""
        });
    }

    editClick(spec){
        this.setState({
            modalTitle:"Edit Specification",
            positionID:spec.positionID,
            description:spec.description,
            parentID:spec.parentID,
            quantityPerParent:spec.quantityPerParent,
            unitMeasurement:spec.unitMeasurement
        });
    }

    createClick(){
        fetch(variables.API_URL+'Specification',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                positionID:this.state.positionID,
                description: this.state.description,
                parentID: this.state.parentID,
                quantityPerParent: this.state.quantityPerParent,
                unitMeasurement: this.state.unitMeasurement
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'Specification',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                positionID: this.state.positionID,
                description: this.state.description,
                parentID: this.state.parentID,
                quantityPerParent: this.state.quantityPerParent,
                unitMeasurement: this.state.unitMeasurement
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'Specification/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }
    }

    render(){
        const {
            specifications,
            modalTitle,
            positionID,
            description,
            parentID,
            quantityPerParent,
            unitMeasurement
        }=this.state;

        return(
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>
                    Add Specification
                </button>
                <div className="row">
                    <div className="col-md-6">
                        <input type="text" className="form-control m-2"
                            placeholder="Filter by positionID"
                            value={this.state.positionIDFilter}
                            onChange={this.changepositionIDFilter}/> {/* Добавляем onChange и привязываем к changepositionIDFilter */}
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control m-2"
                            placeholder="Filter by description"
                            value={this.state.descriptionFilter}
                            onChange={this.changedescriptionFilter}/> {/* Добавляем onChange и привязываем к changedescriptionFilter */}
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>positionID</th>
                            <th>description</th>
                            <th>parentID</th>
                            <th>quantityPerParent</th>
                            <th>unitMeasurement</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specifications.map(spec =>
                            <tr key={spec.positionID}>
                                <td>{spec.positionID}</td>
                                <td>{spec.description}</td>
                                <td>{spec.parentID}</td>
                                <td>{spec.quantityPerParent}</td>
                                <td>{spec.unitMeasurement}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(spec)}>
                                        Edit
                                    </button>
            
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(spec.positionID)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
                <div className="modal fade" id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
                                <button type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">positionID</span>
                                    <input type="text" className="form-control" value={positionID} onChange={this.changepositionID} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">description</span>
                                    <input type="text" className="form-control" value={description} onChange={this.changedescription} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">parentID</span>
                                    <input type="text" className="form-control" value={parentID} onChange={this.changeparentID} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">quantityPerParent</span>
                                    <input type="text" className="form-control" value={quantityPerParent} onChange={this.changequantityPerParent} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">unitMeasurement</span>
                                    <input type="text" className="form-control" value={unitMeasurement} onChange={this.changeunitMeasurement} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                {positionID === 0 ?
                                    <button type="button" className="btn btn-primary" onClick={() => this.createClick()}>Create</button>
                                    : <button type="button" className="btn btn-primary" onClick={() => this.updateClick()}>Update</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Specification;