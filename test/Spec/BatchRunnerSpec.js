describe('BatchRunner', function() {
    beforeEach(module('BatchRunner'));

    var sut;
    beforeEach(inject(function(BatchRunner){
        sut = BatchRunner;
    }));

    it('should return the answer', function(){
        expect(sut.test()).toEqual(42);
    });
});