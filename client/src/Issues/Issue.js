import React, { Component } from 'react';
import { Container,Row,Col,Card,Form,ButtonToolbar,Button,ListGroup } from 'react-bootstrap';
import loading from '../Image/loading.gif';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



class Issue extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isloading: true
    }

    this.state = {
      isListloading :true
    }
    
    this.state =  {
      title : '',
      issueDesc : '',
      richtext:''
    }

    this.state = {
      data: []
    }

    this.state ={
      issue:[]
    }
    
    this.handleChangeTitle = this.handleChangeTitle.bind( this );
    this.handleChangeIssue = this.handleChangeIssue.bind( this );
    this.richtext = this.richtext.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  componentDidMount(){
    this.getLastTenIssue();
  }
  
  // all task for Posting data
  handleChangeTitle =(event) =>{
    this.setState({
      title : event.target.value
    });    
  }
  handleChangeIssue =(event) =>{
    this.setState({
      issueDesc : event.target.value
    });    
  }

  richtext = (data) =>{
    this.setState({
      richtext : data
    });
    console.log(this.state); 
  }

  handleSubmit =(event) =>{
    event.preventDefault();
    const {title,issueDesc,richtext} =this.state;
    axios.post('/issue/add/issue',
    {
      "title" : title,
      "issueDesc": issueDesc,
      "IssueInDetail":richtext
    })
    .then(function(response){
       console.log(response); 
       //alert("Issue submitted for acceptance!");
       this.setState({
            title: "",
            issueDesc : "",
            richtext:""
        });
        this.getLastTenIssue();
    }.bind(this))
    .catch(function(error){
       console.log(error)
       alert("Error!");
    });
    
  }

  //all task for getting data
      getLastTenIssue = (e) =>{
        this.setState({isListloading : true});
        axios.get('/issue/lastTenIssue')
            .then(response => 
                {
                    if (response.status === 200 && response != null) 
                    {
                      this.setState({
                          data: response.data
                      });
                      this.setState({isListloading : false});
                    } 
                    else 
                    {
                      console.log('problem');
                    }
        })
        .catch(error => {
            console.log(error);
        });
    }  

    // Get Issue title and Details
    getDetails =(id)=>{
      this.setState({isloading : true});
      axios.get(`/issue/selected/${id}`)
          .then(response => 
              {
                  if (response.status === 200 && response != null) 
                  {
                    this.setState({
                        issue: response.data
                    });
                    this.setState({isloading : false});
                  } 
                  else 
                  {
                    console.log('problem');
                  }
      })
      .catch(error => {
          console.log(error);
      });
      
    }



  render() {
    const { data } = this.state;
    const { issue } = this.state;
    const cursor ={
      "cursor" : "pointer"
    }

    const content = (
      <Card className="card mb-4 border-0">
                            
        { Array.isArray(issue) && issue.map(SelctedObject => (
        <Card.Body>                          
        <Card.Title>{SelctedObject.title}</Card.Title>                                       
          <Card.Text>
          {SelctedObject.issue}                               
          </Card.Text>  
          <Card.Text dangerouslySetInnerHTML={{__html: SelctedObject.IssueInDetail}}>                             
          </Card.Text>  
                                  
        </Card.Body>
        ))}  
      </Card>
    )

    const LoadingContent = (
      <Card className="card mb-4 border-0">
                            
        <Card.Body>                          
        <Card.Title>Loading</Card.Title>                                       
          <Card.Text>
          Please wait a while <img src={loading} width="40" height="40" alt=""/>                              
          </Card.Text>                          
        </Card.Body>

      </Card>
    )

    const contentList=(
      <ListGroup variant="flush">
      { Array.isArray(data) && data.map(object => (
        <ListGroup.Item style={cursor} onClick={()=>{this.getDetails(object._id)}}>{object.title}</ListGroup.Item>            
      ))}
      </ListGroup>
    )

    return (
      <div className="Issue">
        <Container>  
          <Row>
            <Col xs={9}>
                <Row>
                    <Col xs={12}>
                      <div className="PostIssue">
                          
                            
                            <Card className="card mb-4 border-0">
                              <Card.Body>
                                <Card.Text>
                                  <Form onSubmit={this.handleSubmit} > 
                                    <Form.Label><b>Add New Post Anonymously -</b> </Form.Label> 
                                    <Form.Group controlId="exampleForm.ControlText1">
                                        <Form.Control type="text" id="title" name="title" placeholder="Issue title" onChange={this.handleChangeTitle} value={this.state.title}/>
                                    </Form.Group>  
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" name="issueDesc" rows="3" placeholder="Write here your Issue anonymously" onChange={this.handleChangeIssue} value={this.state.issueDesc}/>
                                    </Form.Group>  
                                    <CKEditor name="richtext"
                                        editor={ ClassicEditor }
                                        data={this.state.richtext}
                                        
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            console.log( { event, editor, data } );
                                            this.richtext(data);
                                            
                                        } }
                                        
                                        
                                    />
                                    <br/>
                                    <ButtonToolbar>
                                        <Button type="submit" variant="primary" >Save and publish post</Button>
                                    </ButtonToolbar>  
                                  </Form>                        
                                </Card.Text>
                                
                              </Card.Body>
                            </Card>
                          
                      </div>
                    </Col>
                    
                    <Col xs={12}>
                      <div className="SelectedIssue">
                      
                      {
                        this.state.isloading ? LoadingContent : content
                      }
                      
                       {/* 
                       Important code look from where [content] variable is coming from. 
                       <Card className="card mb-4 border-0">
                          
                          { Array.isArray(issue) && issue.map(SelctedObject => (
                          <Card.Body>                          
                           <Card.Title>{SelctedObject.title}</Card.Title>                                       
                            <Card.Text>
                            {SelctedObject.issue}                               
                            </Card.Text>                          
                          </Card.Body>
                          ))}  
                      </Card>  */}
                       
                      </div>
                    </Col>

                </Row>
            
            </Col>
            <Col xs={3}>
            {
              this.state.isListloading ? LoadingContent : contentList
            }


            </Col>
          </Row> 
        </Container>  

      </div>
    );
  }
}

export default Issue;
