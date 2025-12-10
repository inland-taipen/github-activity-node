const service=require('./services/githubService');
console.log("INDEX.JS IS RUNNING");
console.log("Importing service...");

const main=async()=>{
const args=process.argv.slice(2);
if(args.length===0){
	console.error('Please provide a GitHub username as a command-line argument.');
	process.exit(1);
}
const username=args[0];
try{
	const events=await service.fetchAndPrintActivity(username);
	console.log(events);

}catch(err){
	console.error(`Error fetching GitHub activity: ${err.message}`);
	process.exit(1);
}

};
main();