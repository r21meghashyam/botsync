const promptly = require('promptly');

const sumOfArray=(array)=>{
	let sum=0;
	array.forEach(value=>{return sum+=Number(value)});
	return sum;
}

const getPossibleTimeArray=(Y,start,X,set)=>{
	let all=[];
	if(X>0)
        for(let i=start;i<Y.length;i++){
			let newSet = set.map(i=>i);
            let n = Y.slice(start,i+1);
			n=sumOfArray(n);
			newSet.push(n);
			let s = getPossibleTimeArray(Y,i+1,X-1,newSet);
			X>1?all.push(...s):all.push(s);
        }
	else{
		let newSet = set.map(i=>i);
		let n = Y.slice(start,X.length);
		n=sumOfArray(n);
		newSet.push(n);
		return newSet;
	}
	return all;
}

const main=async ()=>{
	let X = Number(await promptly.prompt("Enter number of robots (X): "));
	let T = Number(await promptly.prompt("Enter time taken to complete one task (T): "));
	let count = Number(await promptly.prompt("Enter number of tasks count: "));
	let Y=[];
	console.log("Enter elements in each line: ");
	for(let i=0;i<count;i++){
		Y.push(Number(await promptly.prompt("")));
	}
	let timeArrays = getPossibleTimeArray(Y,0,X-1,[]);
	let best = Math.min(...timeArrays.map(i=>Math.max(...i)));
	console.log("Minimun number of time required: ",best*T);
}
main();
