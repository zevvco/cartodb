var StyleUtils = require('../../../src/widgets/auto-style/style-utils.js');

describe('src/widgets/auto-style/style-utils', function () {
  describe('.changeStyle', function () {
    it('should change style attribute', function () {
      var cartocss = '#layer { marker-line-color: white; marker-fill: #adadad;}';
      var attr = 'marker-fill';
      var newStyle = 'blue';

      var expected = '#layer { marker-line-color: white; marker-fill: blue;}';

      expect(StyleUtils.changeStyle(cartocss, attr, newStyle)).toBe(expected);
    });

    it('should change style and remove duplicated', function () {
      var cartocss = '#layer { marker-line-color: white; marker-fill: #adadad; marker-fill: #fafafa;}';
      var attr = 'marker-fill';
      var newStyle = 'blue';

      var expected = '#layer { marker-line-color: white; marker-fill: blue;}';

      expect(StyleUtils.changeStyle(cartocss, attr, newStyle)).toBe(expected);
    });

    it('should change style, remove duplicated and remove styles under conditional symbolizers', function () {
      var cartocss = '#layer { marker-line-color: white; marker-fill: #adadad; [me>gasol] { marker-fill: #fafafa; }}';
      var attr = 'marker-fill';
      var newStyle = 'blue';

      var expected = '#layer { marker-line-color: white; marker-fill: blue; [me>gasol] { }}';

      expect(StyleUtils.changeStyle(cartocss, attr, newStyle)).toBe(expected);
    });

    it('should change style, remove duplicated and don\'t remove braces', function () {
      var cartocss = '#layer { marker-line-color: white; marker-fill: #adadad; [me>gasol] { marker-fill: #fafafa; marker-line-color: green; }}';
      var attr = 'marker-fill';
      var newStyle = 'blue';

      var expected = '#layer { marker-line-color: white; marker-fill: blue; [me>gasol] { marker-line-color: green; }}';

      expect(StyleUtils.changeStyle(cartocss, attr, newStyle)).toBe(expected);
    });

    it('should not replace line-color if it is included under an outline symbolizer', function () {
      var cartocss = '#layer { polygon-fill: white; line-color: red; polygon-opacity: 0.1; ::outline { line-width: 0.5; line-color: green; }}';
      var attr = 'line-color';
      var newStyle = 'blue';

      var expected = '#layer { polygon-fill: white; line-color: blue; polygon-opacity: 0.1; ::outline { line-width: 0.5; line-color: green; }}';

      expect(StyleUtils.changeStyle(cartocss, attr, newStyle)).toBe(expected);
    });

    it('should not replace line-color if it is included under an layer::outline symbolizer', function () {
      var cartocss = '#layer { polygon-fill: white; line-color: red; polygon-opacity: 0.1; } #layer::outline { line-width: 0.5; line-color: green; }';
      var attr = 'line-color';
      var newStyle = 'blue';

      var expected = '#layer { polygon-fill: white; line-color: blue; polygon-opacity: 0.1; } #layer::outline { line-width: 0.5; line-color: green; }';

      expect(StyleUtils.changeStyle(cartocss, attr, newStyle)).toBe(expected);
    });
  });

  describe('.isPropertyIncluded', function () {
    it('should not consider a property is included if it is under a conditional symbolizer', function () {
      var cartocss = '#layer { polygon-fill: white; polygon-opacity: 0.1; [column_name > 0] { line-width: 0.5; line-color: green; }}';
      var attr = 'line-color';
      expect(StyleUtils.isPropertyIncluded(cartocss, attr)).toBe(false);
    });

    it('should be included if attribute is not under a conditional symbolizer', function () {
      var cartocss = '#layer { polygon-fill: white; line-color: red; polygon-opacity: 0.1; }';
      var attr = 'line-color';
      expect(StyleUtils.isPropertyIncluded(cartocss, attr)).toBe(true);
    });

    it('should be included if attribute is under a standard symbolizer', function () {
      var cartocss = '#layer { polygon-fill: white; polygon-opacity: 0.1; ::outline { line-width: 0.5; line-color: green; }}';
      var attr = 'line-color';
      expect(StyleUtils.isPropertyIncluded(cartocss, attr)).toBe(true);
    });

    it('should be included if attribute is under a mapnik::geometry_type conditional symbolizer', function () {
      var cartocss = '#layer { polygon-opacity: 0.1; [mapnik::geometry_type="1"] { polygon-fill: white; }}';
      var attr = 'polygon-fill';
      expect(StyleUtils.isPropertyIncluded(cartocss, attr)).toBe(true);
    });
  });

  describe('.replaceWrongSpaceChar', function () {
    it('should has 12 wrong spaces', function () {
      var cartocss = '#layer { marker-line-color: white; marker-fill #adadad [me>gasol { marker-fill: #fafafa; marker-line-color: green; }}';
      expect(cartocss.match(new RegExp(String.fromCharCode(160), 'g')).length).toBe(12);
    });

    it('should has 0 wrong spaces', function () {
      var cartocss = '#layer { marker-line-color: white; marker-fill #adadad [me>gasol { marker-fill: #fafafa; marker-line-color: green; }}';
      expect(StyleUtils.replaceWrongSpaceChar(cartocss).match(new RegExp(String.fromCharCode(160), 'g'))).toBe(null);
    });
  });
});