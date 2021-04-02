
const CheckoutForm = ()=>{
	return ( 
		<div className="row">
		<div className="col-75">
		  <div className="container">
			<form action="/action_page.php">
	  
			  <div className="row">
				<div className="col-50">
				  <h3>Billing Address</h3>
				  <label for="fname"><i className="fa fa-user"></i> Full Name</label>
				  <input type="text" id="fname" name="firstname" placeholder="John M. Doe"/>
				  <label for="email"><i className="fa fa-envelope"></i> Email</label>
				  <input type="text" id="email" name="email" placeholder="john@example.com"/>
				  <label for="adr"><i className="fa fa-address-card-o"></i> Address</label>
				  <input type="text" id="adr" name="address" placeholder="542 W. 15th Street"/>
				  <label for="city"><i className="fa fa-institution"></i> City</label>
				  <input type="text" id="city" name="city" placeholder="New York"/>
	  
				  <div className="row">
					<div className="col-50">
					  <label for="state">State</label>
					  <input type="text" id="state" name="state" placeholder="NY"/>
					</div>
					<div className="col-50">
					  <label for="zip">Zip</label>
					  <input type="text" id="zip" name="zip" placeholder="10001"/>
					</div>
				  </div>
				</div>
	  
				<div className="col-50">
				  <h3>Payment</h3>
				  <label for="fname">Accepted Cards</label>
				  <div className="icon-container">
					<i className="fa fa-cc-visa" ></i>
					<i className="fa fa-cc-amex" ></i>
					<i className="fa fa-cc-mastercard"></i>
					<i className="fa fa-cc-discover"></i>
				  </div>
				  <label for="cname">Name on Card</label>
				  <input type="text" id="cname" name="cardname" placeholder="John More Doe"/>
				  <label for="ccnum">Credit card number</label>
				  <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"/>
				  <label for="expmonth">Exp Month</label>
				  <input type="text" id="expmonth" name="expmonth" placeholder="September"/>
	  
				  <div className="row">
					<div className="col-50">
					  <label for="expyear">Exp Year</label>
					  <input type="text" id="expyear" name="expyear" placeholder="2018"/>
					</div>
					<div className="col-50">
					  <label for="cvv">CVV</label>
					  <input type="text" id="cvv" name="cvv" placeholder="352"/>
					</div>
				  </div>
				</div>
	  
			  </div>
			  <label>
				<input type="checkbox" checked="checked" name="sameadr"/> 
			  </label>
			  <input type="submit" value="Continue to checkout" className="btn-checkout"/>
			</form>
		  </div>
		</div>
	  
		<div className="col-25">
		  <div className="container">
			<h4>Cart
			  <span className="price">
				<i className="fa fa-shopping-cart"></i>
				<b>4</b>
			  </span>
			</h4>
			<p><a href="#">Product 1</a> <span className="price">$15</span></p>
			<p><a href="#">Product 2</a> <span className="price">$5</span></p>
			<p><a href="#">Product 3</a> <span className="price">$8</span></p>
			<p><a href="#">Product 4</a> <span className="price">$2</span></p>
			<hr/>
			<p>Total <span className="price" ><b>$30</b></span></p>
		  </div>
		</div>
	  </div>
	   
	)
}
export default CheckoutForm
