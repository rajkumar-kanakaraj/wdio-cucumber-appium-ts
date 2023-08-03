import fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';
import {parse} from 'csv-parse/sync';
import * as url from 'url';  

export interface User {
    userId: string;
    password: string;
    points: string;
}

export default class loadDataSource {

private readonly directory: string;

private readonly users: User[];

loadDataFromCSVFile = (fileName: string) => {
    try{
const filePath = path.join(this.directory,fileName);
const file = fs.readFileSync(filePath);
const users: User[] = parse(file, { columns: true, skip_empty_lines: true});
console.log(users);
return users;

} catch  (error) {
    throw new Error(error.message);
}
};

loaddata = () => this.loadDataFromCSVFile('testdata.csv');

constructor(directory = url.fileURLToPath(new URL('.', import.meta.url))
) {
    this.directory = path.resolve(directory);
    this.users = this.loaddata();
}


async getaccount( points: string)
{
    return Promise.resolve(
        this.users.find(
        (users: User) => 
        (users.points === points))
     || undefined 
     );
}

}
