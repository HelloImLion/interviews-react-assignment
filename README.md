# React Interview Assignment - Davide Calarco

## Overview

This repository is a fork of [React Interview Assignment](https://github.com/xtreamsrl/interviews-react-assignment). The domain of the project is a simple grocery e-commerce site, where it has been tasked to perform some improvements, such as refactor and optimization, and implemente new features.  
An important disclaimer: this project has a dependency on a second repository -- [React Interview Assignment - BE](https://github.com/HelloImLion/interviews-react-assignment-be) -- which is needed to make work a certain feature of this project: the last phase of the checkout.   

## How to Run

![disappointed capybara](https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg)

To run this project, clone the repository and execute these commands: 
```
cd ./interviews-react-assignment
npm install
npm run dev
```

Also, make sure to follow the steps described in the "How to Run" section of [React Interview Assignment - BE](https://github.com/HelloImLion/interviews-react-assignment-be) to be able to perform a full simulation of the checkout procedure.  

To run the test suites use the command: 
```
npm test 
```

## Tasks

This section will describe the main tasks of the assignment; for each one of them the desired outcome and the decision process used to achieve it shall be explained.  

#### Pagination

The first assignment of the project was an optimiziation based task. In the original state, the UI fetched the whole list of products.  
This is bad because in a scenario where the list is pretty large or where the user has a bad network, the UI can take some time to load properly, causing a bad user experience.  

As the pagination is a potential cross-cutting concern the implementation of this behaviour has been performed on an hook, aptly named `usePagination`. Whenever the user reaches the end of the page, a call to the hook is made, filtering out unnecessary API Calls.

### Search

The second assignment consisted in the implementation of the "Search" feature to filter the various elements of the product list.  
There were two type of filters that need to be implemented: a search bar located in the header; a list of categories, which can be selected in the sidebar of the UI.  

Due to the pagination implemented in the previous task, the filter feature has to be done via backend. Luckily, a painstaking study made clear that such feature is available. An API call was performed each time a category is clicked or the search bar has a new value; to lessen the load from the network and to not show unnecessary reloadings to the user a debounce mechanism has been implemented for the latter measure of filtering.

### Add to Cart Procedure

The third assignment was pretty much an optimization task. The cart containing all the product is handled by the backend; however the procedure is slow, leading to a painful process if someone wants to buy many products. 

During the execution of this task the main constraint is the slow backend, which for the sake of the assignment it shall be considered unchangeable. The desired outcome of this task can be inferred from the consequence of the constraint: how can the system provide a good UX even if the backend is very slow?

The solution to this problem consists of four measures: 
- Let the user select more than one product at once, even if the first is still loading. 
- Optimistic handling of the UI, the user will be able to see the total of the products in the list.
- Handling of errors to notify the user if unexpected problems are encountered during the procedure.
- A debounce mechanism to lessen the number of API calls made to the server. In a scenario where the cause of the slow backend is simply an overload of work, this approach may even aid in the resolution of the root.

### Checkout Procedure

The last assignment consisisted in the implementation of a checkout procedure; one that should have multiple phases, such as the a summary of the products in the cart, the form for the delivery options and finally the payment method and eventually the success notification.  

The desired outome for this task was one that could emulate as much as possible a real e-commerce scenario; this meant the need for a realistic payment phase. This constraint required some critical security properties, such as integrity of the transaction and confidentiality of the data handled, which, to be handled properly, carried a time of development that did not match with the deadline of the assignment. Because of this, this phase of the procedure was delegated to Stripe.  

This decision was carried by the fact that various web applications, even ones that are based mostly on online services, relies on an external payment processor. Stripe also provides a testing ground and some test card credential to be used to complete the checkout process. 

## How to contribute

This project uses gitflow workflow to handle its branches. If you plan to contribute you should create a feature branch, based on the branch develop. Once the feature is done, it is advised to rebase and squash the branch and then create a Pull Request to adapt its changes.

Releases branches will be handled by the owner and a few selected contributors periodically, once a certain number of key feature have been implemented.

## To do

Here will be listed a few things that could improve the project and may be feature in some future contributions:
- Raise and keep code coverage to 80% of code
- Improve the quality of the tests, as some tests currently expects an higher number of rerender and calls that could be reduced if optimized.
- Improve the UX of the cart composition process by introducing persistance and recreating the cart after a refresh or the failure of an order.
- Improve the responsiveness of the UI, which asis is not handled properly on small devices such as mobile phones.

## Documentation
- [Stripe Test Card Credentials](https://docs.stripe.com/testing?locale=it-IT)
- [MUI Components Documentation](https://mui.com/material-ui/getting-started/)
- [React Interview Assignment - BE](https://github.com/HelloImLion/interviews-react-assignment-be)