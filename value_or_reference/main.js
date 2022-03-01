var a = 1;
var b = 1;
var c = function(){return 'foo';};
var d = function(){return 'bar';};

changeNum = (n) => {n = 2;};
changeFunc = (x) => {x = () => {return 'xyz';};};
changeProps = (p) => {p.props = {prop1: 'q', prop2: 'r'};};
changeFuncThenProps = (xp) => {
    xp = () => {return 'lol';}; //this is done first. i am reassigning xp a new object (happens to be a function)
    xp.props = {prop1: 's', prop2: 't'}; //this is done second.  i am changing the props of xp
}
changePropsThenFunc = (px) => {
    px.props = {prop1: 'u', prop2: 'v'}; //this is done first.  i am changing the props of px
    px = () => {return 'fgh';}; //this is done second. i am reassigning px a new object (happens to be a function)
    }

changeNum(a);  //pass by value
console.log(a);

console.log('---Change Func---');
console.log(c);
console.log(c());
changeFunc(c);
console.log(c);
console.log(c());

console.log('---Change Props---');
c.props = {prop1: 1, prop2: 2};
console.log(c);     //1,2
changeProps(c);
console.log(c);     //q,r

console.log('---Change Func Then Props---');
changeFuncThenProps(c);
console.log(c);     
console.log(c());   

console.log('---Change Props Then Func---');
changePropsThenFunc(c);
console.log(c);     
console.log(c());   
