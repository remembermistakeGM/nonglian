let url = 'http://ceshi.gzjuchuang.com';
if(process.env.NODE_ENV != 'development'){
	url = '/api';
}
export default {
	url
}
