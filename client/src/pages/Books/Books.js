import React, { Component } from 'react';
import Jumbotron from '../../components/Jumbotron';
import DeleteBtn from '../../components/DeleteBtn';
import { Col, Row, Container } from '../../components/Grid';
import { List, ListItem } from '../../components/List';
import { Input, TextArea, FormBtn } from '../../components/Form';
import API from '../../utils/API';

class Books extends Component {
	// Initialize this.state.books as an empty array
	state = {
		books: [],
		title: '',
		author: '',
		synopsis: '',
	};

	// Add code here to get all books from the database and save them to this.state.books
	componentDidMount() {
		this.loadBooks();
	}

	loadBooks = () => {
		API.getBooks()
			.then((data) => {
				this.setState({
					books: data.data,
				});
			})
			.catch((err) => {
				if (err) console.log(err);
			});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		API.saveBook({
			title: this.state.title,
			author: this.state.author,
			synopsis: this.state.synopsis,
		})
			.then((data) => {
				console.log(data.data);
				this.loadBooks();
			})
			.catch((err) => {
				if (err) console.log(err);
			});
	};

	changeHandler = (e) => {
		console.log(e.target.name);
		const { name, value } = e.target;

		this.setState({
			[name]: value,
		});
	};
	deletBook = (e, bookId) => {
		//e.preventDefault();
		console.log(bookId);
		API.deleteBook(bookId)
			.then((data) => {
				console.log(data);
				this.loadBooks();
			})
			.catch((err) => {
				if (err) console.log(err);
			});
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-6">
						<Jumbotron>
							<h1>What Books Should I Read?</h1>
						</Jumbotron>
						<form>
							<Input
								onChange={this.changeHandler}
								name="title"
								placeholder="Title (required)"
							/>
							<Input
								onChange={this.changeHandler}
								name="author"
								placeholder="Author (required)"
							/>
							<TextArea
								onChange={this.changeHandler}
								name="synopsis"
								placeholder="Synopsis (Optional)"
							/>
							<FormBtn onClick={this.handleSubmit}>Submit Book</FormBtn>
						</form>
					</Col>
					<Col size="md-6 sm-12">
						<Jumbotron>
							<h1>Books On My List</h1>
						</Jumbotron>
						{this.state.books.length ? (
							<List>
								{this.state.books.map((book) => (
									<ListItem key={book._id}>
										<a href={'/books/' + book._id}>
											<strong>
												{book.title} by {book.author}
											</strong>
										</a>
										<DeleteBtn onClick={(e) => this.deletBook(e, book._id)} />
									</ListItem>
								))}
							</List>
						) : (
							<h3>No Results to Display</h3>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Books;
