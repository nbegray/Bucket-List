import React from "react";
import axios from "axios";
import PexelsAPI from "pexels-api-wrapper";

//Create Client instance by passing in API key
var pexelsClient = new PexelsAPI("563492ad6f917000010000015796d8934c854f92a64a4236b61829a6");

class postItem extends React.Component {

    state = {
        title: "",
        image: ""

    }


    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        if (this.state.title) {
            let itemInfo = {
                title: this.state.title,
                image: ""
            }
            pexelsClient.search(itemInfo.title, 1, 1)
                .then(function (result) {
                    console.log(result.photos[0].src.medium);
                    itemInfo.image = result.photos[0].src.medium;

                    axios.post("/api/items", itemInfo).then(res => console.log(res)).catch(err => console.log(err));


                }).
                catch(function (e) {
                    console.err(e);
                });


            this.setState({
                title: ""
            });

        }


    };
    render() {
        return <div className="modal" id="postItemBtn" tabindex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <h4 className="text-center"><i class="far fa-plus-square"></i> Post an Item</h4>
                        <hr />
                        <form>
                            <div class="form-group">
                                <label for="name">Title</label>
                                <input
                                    value={this.state.title}
                                    name="title"
                                    onChange={this.handleInputChange}
                                    type="text" class="form-control" id="title" aria-describedby="title" placeholder="Enter a Bucketlist Item" />
                            </div>

                            <button onClick={this.handleFormSubmit} type="submit" class="btn btn-primary col-12"><i class="far fa-plus-square"></i> Post</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>


    }

}

export default postItem;