module.exports = {
 getJava(packageName, className) {
     return 'package ' + packageName + ';\n' +
         '\n' +
         'import javax.annotation.Nullable;\n' +
         '\n' +
         'import com.adobe.cq.export.json.ComponentExporter;\n' +
         '\n' +
         'public interface ' + className + ' extends ComponentExporter {\n' +
         '    \n' +
         '    /**\n' +
         '     * Replace this property with your own.\n' +
         '     *\n' +
         '     * @return\n' +
         '     */\n' +
         '    @Nullable\n' +
         '    public String getSomething();\n' +
         '\n' +
         '}';
 }
};