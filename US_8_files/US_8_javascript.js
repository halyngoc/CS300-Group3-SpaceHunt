// US_8_javascript.js
// edited by: Alan Gomez

var module_1_demo = {
	values: [1, 2, 3],
	parameter_2: 5,
	parameter_3: "merlin engine",
	print_data: function() {
		console.log("** module_1 state:")
		console.log("variable 1 = " + this.values[0])
		console.log("variable 2 = " + this.values[1])
		console.log("variable 3 = " + this.values[2])
		console.log("variable 4 = " + this.parameter_2)
		console.log("variable 5 = " + this.parameter_3)
	}
}
var offline_data_manager = {
	store_data: function() { 
		localStorage.setItem("module_1_1", module_1_demo.values[0])
		localStorage.setItem("module_1_2", module_1_demo.values[1])
		localStorage.setItem("module_1_3", module_1_demo.values[2])
		localStorage.setItem("module_1_4", module_1_demo.parameter_2)
		localStorage.setItem("module_1_5", module_1_demo.parameter_3)
	},
	restore_data: function() {
		var conf = confirm("Would you like to continue previous game?")
		if (conf == true) {
			console.log("** restoring data to previous state")
			module_1_demo.values[0] = localStorage.getItem("module_1_1")
			module_1_demo.values[1] = localStorage.getItem("module_1_2")
			module_1_demo.values[2] = localStorage.getItem("module_1_3")
			module_1_demo.parameter_2 = localStorage.getItem("module_1_4")
			module_1_demo.parameter_3 = localStorage.getItem("module_1_5")
		}

	}
}
