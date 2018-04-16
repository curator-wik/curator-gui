describe('ApiLocator', function() {
    beforeEach(module('application'));

    var sut;
    beforeEach(inject(function(ApiLocator){
        sut = ApiLocator;
    }));

    beforeEach(function(){
        sut.setPath('http://fred/api/v1');
    })

    it('should allow setting and getting of the base path', function(){
        expect(sut.getPath()).toEqual('http://fred/api/v1/');
    });

    it('should produce absolute URLs given endpoint paths', function(){
        expect(sut.url('status')).toEqual('http://fred/api/v1/status')
    });
});