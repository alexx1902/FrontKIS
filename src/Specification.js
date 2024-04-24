import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Specification extends Component {

    constructor(props){
        super(props);

        this.state={
            specifications:[],
            modalTitle:"",
            PositionID:0,
            ParentID:"",
            Description:"",
            QuantityPerParent:0,
            UnitMeasurement:"",

            PositionIDFilter:"",
            DescriptionFilter:"",
            specificationsWithoutFilter:[]
        }
    }

    FilterFn(){
        var PositionIDFilter=this.state.PositionIDFilter;
        var DescriptionFilter = this.state.DescriptionFilter;

        var filteredData=this.state.specificationsWithoutFilter.filter(
            function(el){
                return el.PositionID.toString().toLowerCase().includes(
                    PositionIDFilter.toString().trim().toLowerCase()
                ) &&
                el.Description.toString().toLowerCase().includes(
                    DescriptionFilter.toString().trim().toLowerCase()
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

    changePositionIDFilter = (e)=>{
        this.setState({PositionIDFilter: e.target.value}, () => this.FilterFn());
    }
    changeDescriptionFilter = (e)=>{
        this.setState({DescriptionFilter: e.target.value}, () => this.FilterFn());
    }
    changeParentID = (e)=>{
        this.setState({ParentID: e.target.value});
    }
    changeDescription = (e)=>{
        this.setState({Description: e.target.value});
    }
    changeQuantityPerParent = (e)=>{
        this.setState({QuantityPerParent: e.target.value});
    }
    changeUnitMeasurement = (e)=>{
        this.setState({UnitMeasurement: e.target.value});
    }

    refreshList(){
        fetch(variables.API_URL+'specification')
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
            PositionID:0,
            Description:"",
            ParentID:"",
            QuantityPerParent:0,
            UnitMeasurement:""
        });
    }

    editClick(spec){
        this.setState({
            modalTitle:"Edit Specification",
            PositionID:spec.PositionID,
            Description:spec.Description,
            ParentID:spec.ParentID,
            QuantityPerParent:spec.QuantityPerParent,
            UnitMeasurement:spec.UnitMeasurement
        });
    }

    createClick(){
        fetch(variables.API_URL+'specification',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Description: this.state.Description,
                ParentID: this.state.ParentID,
                QuantityPerParent: this.state.QuantityPerParent,
                UnitMeasurement: this.state.UnitMeasurement
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
        fetch(variables.API_URL+'specification',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                PositionID: this.state.PositionID,
                Description: this.state.Description,
                ParentID: this.state.ParentID,
                QuantityPerParent: this.state.QuantityPerParent,
                UnitMeasurement: this.state.UnitMeasurement
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
            fetch(variables.API_URL+'specification/'+id,{
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
            PositionID,
            Description,
            ParentID,
            QuantityPerParent,
            UnitMeasurement
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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>PositionID</th>
                            <th>Description</th>
                            <th>ParentID</th>
                            <th>QuantityPerParent</th>
                            <th>UnitMeasurement</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specifications.map(spec =>
                            <tr key={spec.PositionID}>
                                <td>{spec.PositionID}</td>
                                <td>{spec.Description}</td>
                                <td>{spec.ParentID}</td>
                                <td>{spec.QuantityPerParent}</td>
                                <td>{spec.UnitMeasurement}</td>
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
                                        onClick={() => this.deleteClick(spec.PositionID)}>
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
                                                <h5 className="modal-title">{modalTitle}</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Description</span>
                                                    <input type="text" className="form-control"
                                                        value={Description}
                                                        onChange={this.changeDescription}/>
                                                </div>
                
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">ParentID</span>
                                                    <input type="text" className="form-control"
                                                        value={ParentID}
                                                        onChange={this.changeParentID}/>
                                                </div>
                
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">QuantityPerParent</span>
                                                    <input type="number" className="form-control"
                                                        value={QuantityPerParent}
                                                        onChange={this.changeQuantityPerParent}/>
                                                </div>
                
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">UnitMeasurement</span>
                                                    <input type="text" className="form-control"
                                                        value={UnitMeasurement}
                                                        onChange={this.changeUnitMeasurement}/>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                                    onClick={PositionID===0?this.createClick:this.updateClick}>
                                                    {PositionID===0?'Create':'Update'}
                                                </button>
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
                