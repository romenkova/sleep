import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const plugins = {
  common: [
    resolve(),
    babel(),
    scss({ output: 'public/index.css' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.mode)
    }),
    commonjs()
  ],
  production: [terser()],
  development: [
    serve({ contentBase: 'public', port: 8080, host: '192.168.1.65' }),
    livereload({
      watch: ['public/**']
    })
  ]
};

export default {
  input: 'src/index.js',
  output: { dir: 'public', format: 'iife' },
  plugins: [...plugins.common, ...plugins[process.env.mode]]
};
