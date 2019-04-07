class Utils {

  arithmetical_mean = (array, n) => {
    let sum = 0;
    for (num in array){
        sum += num
    }
    return sum/n; //sum(all)/size
  }

  geometric_mean = (array, n) => {
    let mult = 1;
    for (num in array) {
      mult *= num;
    }
    return pow(mult,1/n); //n-root(mult(all))
  }

  standard_deviation = (array, n) => {
    let s = 0;
    let mean = this.arithmetical_mean(array,n);
    for (num in array) {
      s += (num-mean)*(num-mean);
    }
    return sqrt(s/(n-1));
  }

  time_accuracy = (tasks, time_diff) => {
    
  }


}
module.exports = Utils
